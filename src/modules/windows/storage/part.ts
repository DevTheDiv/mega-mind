
import {PowerShell } from "node-powershell";
import { camelCase } from "change-case-all";


const partitions = async ()  : Promise<[any[], string]> => {
    let d = PowerShell.$`Get-Partition | ConvertTo-Json`;

    let {stdout, stderr} = await d;
    
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";

    if(psErr) throw new Error(stderr?.toString() || "Unknown Error");


    let json : Array<any> = JSON.parse(psOut);

    json = json.map(d => {
        delete d["CimInstanceProperties"];
        delete d["CimSystemProperties"];
        delete d["CimClass"];

        // camelcase all keys
        const newObj = Object.fromEntries(
            Object.entries(d).map(([k, v]) => [camelCase(k), v])
        ) as Record <keyof any, any>;

        d = newObj;
        return d;
    });
    return [json, psOut];
}

const getDiskPartitions = async (disk : number) => {
    let ps = PowerShell.$`Get-Disk -Number ${disk} | Get-Partition | ConvertTo-Json`;
    let {stdout, stderr} = await ps;
    
    let psOut = stdout?.toString() || "[]";
    let psErr = stderr?.toString() || "";


    if(psErr) throw new Error(stderr?.toString() || "Unknown Error");

    

    let json : Array<any> = JSON.parse(psOut);

    if(!Array.isArray(json)) json = [json]; 

    return [json, psOut];

};


export default async (driveNumber: number) => {
    let [j] = await getDiskPartitions(driveNumber);

    return j;
};