


import { spawnSync } from "child_process";


import alphanumerize from "alphanumerize";
import { resolve } from "path";
import * as Papa from "papaparse";
import { PowerShell } from "node-powershell";
import {camelCase} from "change-case-all";


// // this gives an accurate sector size
// const fsutilSectorInfo = (pathWindows: string) => new Promise<[IFSUtilSectorInfo, string]>((accept, reject) => {

//     let {error, output} = spawnSync("fsutil", ["fsInfo", "sectorInfo", pathWindows], {
//         encoding: "utf8"
//     });

//     if(error) return reject(error);

//     let o = output.toString();

//     let bytesPerSectorForAtom : string | number
//         = o.match(/PhysicalBytesPerSectorForAtomicity :\s+([0-9]+)/)?.[1] || "-1";
//     let bytesPerSectorForPerf : string | number
//         = o.match(/PhysicalBytesPerSectorForPerformance :\s+([0-9]+)/)?.[1] || "-1";    

//     bytesPerSectorForAtom = parseInt(bytesPerSectorForAtom);
//     bytesPerSectorForPerf = parseInt(bytesPerSectorForPerf);

//     return accept([{
//         physicalBytesPerSectorForAtomicity: bytesPerSectorForAtom,
//         physicalBytesPerSectorForPerformance: bytesPerSectorForPerf
//     }, log("fsutil fsInfo sectorInfo", o)]);
// });

let wmicDiskDrive =  async () : Promise<IWin32_DiskDrive[]> =>  {
    let ps = PowerShell.$`Get-CimInstance -ClassName Win32_DiskDrive -Property * | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error"); 

    let _tmp = JSON.parse(psOut);
    let wmicData : IWin32_DiskDrive[] = Array.isArray(_tmp) ? _tmp : [_tmp];
  
    return wmicData;
};

let psGetDisk = async (drive:number) : Promise<IPSGetDisk> => {
    let ps = PowerShell.$`Get-Disk -Number ${drive} | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    let psData : IPSGetDisk = JSON.parse(psOut);
    return psData;
}

let psGetPhysicalDisk = async (drive: number) : Promise<IPSGetPhysicalDisk> => {
    // Basically
    // Get-CimInstance -Namespace "Root\Microsoft\Windows\Storage" -ClassName "MSFT_StorageObject"
    let ps = PowerShell.$`Get-Disk -Number ${drive} | Get-PhysicalDisk | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    
    let psData : IPSGetPhysicalDisk = JSON.parse(psOut);
    return psData;
}



let psGetPartition = async (drive: number) : Promise<IPSGetPartition[]> => {

    let ps = PowerShell.$`Get-Disk -Number ${drive} | Get-Partition | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    let _data = JSON.parse(psOut);
    let psData : IPSGetPartition[] = Array.isArray(_data) ? _data : [_data];

    // now time to get the volume info
    for(let p of psData) {
        let {PartitionNumber} = p;
        let [volume] = await psGetVolume(drive, PartitionNumber).catch(() => []);
        p.Volume = volume;
    }
    
    return psData;
};

let psGetVolume = async (disk: number, partition: number) : Promise<IPSGetVolume[]> => {

    // convert the json back
    let ps = PowerShell.$`Get-Partition -DiskNumber ${disk} -PartitionNumber ${partition} | Get-Volume | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error");
    let _data = JSON.parse(psOut);
    let psData : IPSGetVolume[] = Array.isArray(_data) ? _data : [_data];
    return psData;
}


export {
    psGetDisk,
    psGetPhysicalDisk,
    psGetPartition,
    wmicDiskDrive,
    psGetVolume
}