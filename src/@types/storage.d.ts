interface IStorage {
    index: number;
    uniqueId: string;
    serialNumber: string;
    model: string;
    paths: string[];
    capacity: number;
    useableCapacity: number;
    logicalSectorSize: number;
    physicalSectorSize: number;
    totalSectors: number;
    firmware: string;
    mediaType: string;
    busType: string;
    smart?: any;
    scsi: {
        host: number;
        channel: number;
        target: number;
        lun: number;
    };
    partitionCount: number;
    partitions: IPartition[];
}

interface IPartition {

    active: boolean;
    boot: boolean;
    // can be a mount path or a drive letter (in windows case)
    identifier: string;
    type: string;
    readonly: boolean;

    size: number;
    offset: number;

    uniqueId: string;
    guid: string;
    partitionNumber: number;

    volume?: IVolume;
}

interface IVolume {
    health: string;
    fileSystem: string;
    uniqueId: string;
    blockSize: number;
    label: string;
    size: number;
    sizeRemaining: number;
}