
import {exec, spawn, spawnSync, execSync} from "child_process";

import alphanumerize from "alphanumerize";
import { resolve } from "path";
import { PowerShell } from "node-powershell";

import {camelCase} from "change-case-all";


const _smartctl ="\\Program\ Files\\smartmontools\\bin\\smartctl.exe";




interface IFSUtilSectorInfo {
    physicalBytesPerSectorForAtomicity: number,
    physicalBytesPerSectorForPerformance: number
}





let log = (command: string, data: string) => {
    return `${command}\n ${data}\n\n`;
};

let smartAllInfo = async (drive: string) : Promise<[ISmartDrive, string]> =>   {
    let smartctlInfo = spawnSync(_smartctl, ["-j", "-x", drive], {
        encoding: "utf8"
    });

    if(smartctlInfo.error) throw new Error(smartctlInfo.stderr.toString());
    
    let _smartInfo = smartctlInfo.stdout.toString();
    let smartInfo = JSON.parse(_smartInfo);
    
    // rename all keys to camelCase
    smartInfo = (Object.fromEntries(Object.entries(smartInfo).map(([k, v]) => [camelCase(k), v])) as Record <keyof ISmartDrive, any>) as ISmartDrive;
    // @ts-ignore
    delete smartInfo.smartctl;
    // @ts-ignore
    delete smartInfo.jsonFormatVersion;
    // @ts-ignore
    delete smartInfo.localTime;

    // console.log(smartInfo);
    
    return [smartInfo, log(`${_smartctl} -j -i ${drive}`, _smartInfo)];
}



// this gives an accurate sector size
const fsutilSectorInfo = (pathWindows: string) => new Promise<[IFSUtilSectorInfo, string]>((accept, reject) => {

    let {error, output} = spawnSync("fsutil", ["fsInfo", "sectorInfo", pathWindows], {
        encoding: "utf8"
    });

    if(error) return reject(error);

    let o = output.toString();

    let bytesPerSectorForAtom : string | number
        = o.match(/PhysicalBytesPerSectorForAtomicity :\s+([0-9]+)/)?.[1] || "-1";
    let bytesPerSectorForPerf : string | number
        = o.match(/PhysicalBytesPerSectorForPerformance :\s+([0-9]+)/)?.[1] || "-1";    

    bytesPerSectorForAtom = parseInt(bytesPerSectorForAtom);
    bytesPerSectorForPerf = parseInt(bytesPerSectorForPerf);

    return accept([{
        physicalBytesPerSectorForAtomicity: bytesPerSectorForAtom,
        physicalBytesPerSectorForPerformance: bytesPerSectorForPerf
    }, log("fsutil fsInfo sectorInfo", o)]);
});


let wmicDrives =  async () : Promise<[IWin32_DiskDrive[], string]> =>  {
    let ps = PowerShell.$`Get-CimInstance -ClassName Win32_DiskDrive -Property * | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error"); 

    let wmicData : IWin32_DiskDrive[] = JSON.parse(psOut);
    wmicData = wmicData.map((d: IWin32_DiskDrive) => {
        //@ts-ignore
        delete d["CimInstanceProperties"];
        //@ts-ignore
        delete d["CimSystemProperties"];
        //@ts-ignore
        delete d["CimClass"];
        // lowercase all keys
        const newObj = Object.fromEntries(Object.entries(d).map(([k, v]) => [camelCase(k), v])) as Record <keyof IWin32_DiskDrive, any>;
        d = newObj as IWin32_DiskDrive;
        return d;
    });

    return [wmicData, psOut];
};

let getPartitionStyle = async (drive:number) : Promise<[string, string]> => {
    let ps = PowerShell.$`Get-Disk -Number ${drive} | Select-Object -ExpandProperty PartitionStyle`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    return [psOut, psOut];
}

let getPhysicalDisk = async (drive: number) : Promise<[IMSFT_PhysicalDisk, string]> => {
    let ps = PowerShell.$`Get-Disk -Number ${drive} | Get-PhysicalDisk | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    
    let wmicData : IMSFT_PhysicalDisk = JSON.parse(psOut);
    //@ts-ignore
    delete wmicData["CimInstanceProperties"];
    //@ts-ignore
    delete wmicData["CimSystemProperties"];
    //@ts-ignore
    delete wmicData["CimClass"];
    // lowercase all keys
    const newObj = Object.fromEntries(Object.entries(wmicData).map(([k, v]) => [camelCase(k), v])) as Record <keyof IMSFT_PhysicalDisk, any>;

    if(newObj.mediaType === "Unspecified") newObj.mediaType = "";

    return [newObj, psOut];
}

export default async () =>  {

    let [wdrives] = await wmicDrives();

    let drives : IDrive[] = [];

    for (let i = 0; i < wdrives.length; i++) {
        let wdrive = wdrives[i];

        let alphaIndex = alphanumerize(wdrive.index + 1);
        let pathLinux = `/dev/sd${alphaIndex}`;
        let [smartInfoDrive] = await smartAllInfo(pathLinux);
        let [partitionStyle] = await getPartitionStyle(wdrive.index);

        let [physicalDisk] = await getPhysicalDisk(wdrive.index);
        // console.log(physicalDisk)

        // prefer smart info since it is more accurate

        let serial = smartInfoDrive.serialNumber || physicalDisk.fruId || physicalDisk.serialNumber || wdrive.serialNumber || "Unknown";
        let drive : IDrive = {
            index: wdrive.index,
            serial: serial,
            uniqueId: physicalDisk.uniqueId || serial || "Unknown",
            model: smartInfoDrive.modelName || wdrive.model || "Unknown",
            pathWindows: wdrive.deviceId,
            pathLinux,
            partitionCount: wdrive.partitions,
            size: smartInfoDrive?.userCapacity?.bytes|| wdrive.size || -1,
            logicalSectorSize: physicalDisk.logicalSectorSize || wdrive.bytesPerSector|| -1,
            physicalSectorSize:  physicalDisk.physicalSectorSize || wdrive.bytesPerSector|| -1,
            busType: physicalDisk.busType || smartInfoDrive?.device?.type || wdrive.interfaceType || "Unknown",
            mediaType: physicalDisk.mediaType || wdrive.mediaType || "Unknown",
            scsi: {
                host: wdrive.scsiPort,
                channel: wdrive.scsiBus,
                target: wdrive.scsiTargetId,
                lun: wdrive.scsiLogicalUnit
            },
            firmware: smartInfoDrive.firmwareVersion || wdrive.firmwareRevision || "Unknown",
            partitionStyle,
            wmiDiskDrive: wdrive,
            smartInfo: smartInfoDrive,
        };


        //@ts-ignore
        delete drive.smartInfo
        //@ts-ignore
        delete drive.wmiDiskDrive;

        //@ts-ignore
        drives.push(drive);
    }

    // console.log(drives);
    return drives;
};