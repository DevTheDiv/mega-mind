
import { spawnSync } from "child_process";


import alphanumerize from "alphanumerize";
import { resolve } from "path";
import * as Papa from "papaparse";
import { PowerShell } from "node-powershell";

const physicalMemort = async ()  : Promise<[IWminDIMM[], string]> => {
    let pm = PowerShell.$`Get-CimInstance Win32_PhysicalMemory | ConvertTo-Json`;
    let {stdout, stderr} = await pm;
    let log = stdout?.toString() || "";
    let err = stderr?.toString() || "";
    if(err) throw new Error(err);

    let json : Array<IWminDIMM> = JSON.parse(log);
    json = json.map(d => {
        //@ts-ignore
        delete d["CimInstanceProperties"];
        //@ts-ignore
        delete d["CimSystemProperties"];
        //@ts-ignore
        delete d["CimClass"];
        return d;
    });
    return [json, log];
}

//Get-WmiObject Win32_PhysicalMemory


export default async () => {
    let [e] =  await physicalMemort()
    return e;
};