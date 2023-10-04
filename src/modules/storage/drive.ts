
import {exec, spawn, spawnSync, execSync} from "child_process";

import alphanumerize from "alphanumerize";
import { resolve } from "path";
import Papa from "papaparse";
import { PowerShell } from "node-powershell";

import {camelCase} from "change-case-all";


const _smartctl ="\\Program\ Files\\smartmontools\\bin\\smartctl.exe";

interface ISmartScan {
    pathLinux: string;
    type?: string;
}

interface ISmartInfo {
    serial?: string;
    wwn?: string;
    model?: string;
    modelFamily?: string;
    deviceModel?: string;
    firmwareVersion?: string;
    rotationRate?: number;
    userCapacity?: string;
    sectorSize?: number;
    smartSupport?: boolean;
    smartEnabled?: boolean;
    formFactor?: string;
}

interface IWmicDrive {
    model?: string;
    deviceid: string;
    serialNumber?: string;
    pathWindows: string;
    interfaceType?: string;
    index: number,
    sectors: number,
    size: number,
    partitions: number
}

interface ISmartDrive extends ISmartScan, ISmartInfo {
    
}



interface IFSUtilSectorInfo {
    physicalBytesPerSectorForAtomicity: number,
    physicalBytesPerSectorForPerformance: number
}

interface IDrive extends ISmartScan, ISmartInfo, IWmicDrive {
    partitionStyle?: string;
}



let log = (command: string, data: string) => {
    return `${command}\n ${data}\n\n`;
};

let smartAllInfo = (drive: string) : Promise<[ISmartInfo, string]> => new Promise((resolve, reject) =>  {
    let smartctlInfo = spawnSync(_smartctl, ["-j", "-i", drive], {
        encoding: "utf8"
    });

    if(smartctlInfo.error) return reject(smartctlInfo.stderr.toString());
    
    let _smartInfo = smartctlInfo.stdout.toString();

    // console.log(smartctlInfo, _smartInfo)
    let _smartInfoJSON : {model_family: string, serial_number: string, wwn: string, firmware_version: string, user_capacity: string, physical_block_size: number, rotation_rate: number, form_factor: {name:string}} = JSON.parse(_smartInfo);

    let smartInfo : ISmartInfo = {};

    
    let modelFamily = _smartInfoJSON["model_family"];
    // let model = _smartInfoJSON["smartctl"]["model_name"];

    let serial = _smartInfoJSON["serial_number"];
    let wwn = _smartInfoJSON["wwn"];
    let firmwareVersion = _smartInfoJSON["firmware_version"];
    let userCapacity = _smartInfoJSON["user_capacity"];
    let sectorSize = _smartInfoJSON["physical_block_size"];
    let rotationRate = _smartInfoJSON["rotation_rate"];
    let formFactor = _smartInfoJSON["form_factor"]?.["name"];

    // console.log(_smartInfo);
    smartInfo = {
        modelFamily: modelFamily,
        // deviceModel: deviceModel,
        serial,
        wwn: wwn,
        firmwareVersion: firmwareVersion,
        userCapacity: userCapacity,
        // sectorSize: sectorSize,
        rotationRate: rotationRate,
        formFactor: formFactor
    };
    
    return resolve([smartInfo, log(`${_smartctl} -j -i ${drive}`, _smartInfo)]);
});



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


let wmicDrives =  async () : Promise<[IWmicDrive[], string]> =>  {

    let ps = PowerShell.$`Get-CimInstance -ClassName Win32_DiskDrive -Property * | ConvertTo-Json`;

    let {stdout, stderr} = await ps;
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(psErr?.toString() || "Unknown Error"); 

    let wmicData : IWmicDrive[] = JSON.parse(psOut);
    wmicData = wmicData.map((d: IWmicDrive) => {
        //@ts-ignore
        delete d["CimInstanceProperties"];
        //@ts-ignore
        delete d["CimSystemProperties"];
        //@ts-ignore
        delete d["CimClass"];

        // lowercase all keys
        const newObj = Object.fromEntries(
            Object.entries(d).map(([k, v]) => [camelCase(k), v])
        ) as Record <keyof IWmicDrive, any>;

        d = newObj;
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


const hdparmDebug = (drive: string) => new Promise((accept, reject) => {
    let _hdparm = spawnSync("\\Program\ Files\\hdparm\\hdparm.exe", ["--debug", drive], {
        encoding: "utf8"
    });

    if(_hdparm.error) return reject(_hdparm.error);

    let output = _hdparm.output.toString();
    let drivePath = output.match(/(\\\\\.\\PhysicalDrive[0-9]+)/)?.[1];
    return accept(drivePath?.toUpperCase());
});

export default async () =>  {

    let [wdrives] = await wmicDrives();



    let drives : ISmartDrive[] = [];

    for (let i = 0; i < wdrives.length; i++) {
        let wdrive = wdrives[i];
        let alphaIndex = alphanumerize(wdrive.index + 1);
        let pathLinux = `/dev/sd${alphaIndex}`;
        let physicalPath = `/dev/pd${alphaIndex}`;
        let [smartInfoDrive] = await smartAllInfo(pathLinux);
        let [partitionStyle] = await getPartitionStyle(wdrive.index);

        let drive : IDrive = {
            ...wdrive,
            ...smartInfoDrive,
            pathLinux,
            partitionStyle
        };

        // console.log(drive)
        // @ts-ignore
        console.log(drive.size / drive.totalSectors)
        // drives.push(drive);
    }

    // console.log(drives);
    return drives;
};