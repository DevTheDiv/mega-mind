

import os from 'os';
import { psGetDisk, psGetPhysicalDisk, wmicDiskDrive, psGetPartition } from "../modules/windows/storage.js";
import { smartXAllInfo } from '../modules/tools/smartctl.js';

import alphanumerize from 'alphanumerize';





class StorageDevice  {
    constructor(data: IStorage) {
        Object.assign(this, data);
    }
}

interface StorageDevice extends IStorage {}

class StorageManager {

    devices: StorageDevice[] = [];
    _wmicDisks: IWin32_DiskDrive[] = [];
    
    async init() {
        switch (os.platform()) {
            case 'win32':
                await this.loadWin();
                break;
            default:
                break;
        }
        return this.devices;
    }

    async loadWin() {
        this._wmicDisks = await wmicDiskDrive();

        for(let wd of this._wmicDisks){
            let { Index, DeviceID, SerialNumber, Size: UserCapacity, FirmwareRevision, SCSIBus, SCSILogicalUnit, SCSIPort, SCSITargetId, TotalSectors, Partitions, MediaType} = wd;
            let alpha = alphanumerize(Index + 1);

            let pd = await psGetPhysicalDisk(Index);
            let {UniqueId} = pd;

            let d = await psGetDisk(Index);

            // the logical and physical sector size here is more reliable than wmic and get-physicaldisk and idk why
            let {PhysicalSectorSize, LogicalSectorSize, Size, BusType} = d;

            let paths = [DeviceID, `/dev/pd${Index}`, `/dev/sd${alpha}`];

            let smart = await smartXAllInfo(paths[1]);
            let { smart_support, power_on_time, temperature } = smart;


            let partitions = await psGetPartition(Index);

            let _partitions : IPartition[] = [];



            for (let _p of partitions) {
                
                let {Size: PartitionSize, DriveLetter, Guid, Type, IsActive, IsBoot, AccessPaths, PartitionNumber, DiskNumber, IsReadOnly, Volume}  = _p;
                // not all partitions are readable to windows or have volumes
                let {FileSystem, FileSystemLabel, HealthStatus: VolumeHealth, Path: VolumePath, AllocationUnitSize, SizeRemaining, Size : VolumeSize } = Volume || {};

                let partition : IPartition = {
                    active: IsActive,
                    boot: IsBoot,
                    identifier: DriveLetter || "_",
                    type: Type,
                    readonly: IsReadOnly || false,
                    size: PartitionSize,
                    offset: 0,
                    uniqueId: Guid,
                    guid: Guid,
                    partitionNumber: PartitionNumber,
                    volume: {
                        health: VolumeHealth || "UNKNOWN",
                        fileSystem: FileSystem || "N/A",
                        uniqueId: Guid || "N/A",
                        blockSize: AllocationUnitSize || -1,
                        label: FileSystemLabel || "NO LABEL",
                        size: VolumeSize || -1,
                        sizeRemaining: SizeRemaining || -1
                    }
                }
                _partitions.push(partition);
            };


            

            let tmp : IStorage | null  = {
                index: Index,
                paths: paths,
                uniqueId: UniqueId  || smart.serial_number || SerialNumber,
                serialNumber: smart.serial_number || SerialNumber,
                model: d.FriendlyName,
                capacity: Size,
                useableCapacity: UserCapacity,
                logicalSectorSize: LogicalSectorSize,
                physicalSectorSize: PhysicalSectorSize,
                totalSectors: TotalSectors,
                firmware: FirmwareRevision,
                mediaType: MediaType,
                busType: BusType,
                smart: {
                    enabled: smart_support?.enabled,
                    healthy: smart.smart_status?.passed,
                    powerOnHours: power_on_time?.hours,
                    temperature: temperature?.current,
                    temperatureMax: temperature?.limit_max || 70
                },
                scsi: {
                    host: SCSIPort,
                    channel: SCSIBus,
                    target: SCSITargetId,
                    lun: SCSILogicalUnit
                },
                partitionCount: Partitions,
                partitions: _partitions
            };
            let _storage = new StorageDevice(tmp);
            this.devices.push(_storage);
            tmp = null;
        }        
    }

}

export default StorageManager;