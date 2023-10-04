
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

const getDiskPartitions = async () => {
    let ps = PowerShell.$`Get-Disk | Get-Partition | ConvertTo-Json`;

};

(async () => {

    let [j] = await partitions();
    console.log(j);

})()