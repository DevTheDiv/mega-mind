
import { spawnSync } from "child_process";


import alphanumerize from "alphanumerize";
import { resolve } from "path";
import * as Papa from "papaparse";




import { PowerShell } from "node-powershell";

const wmicBaseboard = async () : Promise<[IWminBaseboard[], string]> =>  {
    let ps =  PowerShell.$`Get-WmiObject win32_baseboard | ConvertTo-Json`;

    let {stderr, stdout } = await ps;

    // spawn example usage
    // let wmic = spawnSync("wmic", [ "baseboard", "get", "*", "/format:csv"], {
    //     encoding: "utf-8"
    // });
    
    let _json = stdout?.toString() || "[]";
    let _err = stderr?.toString() || "";
    
    if(_err) throw new Error(_err);

    let psdata : IWminBaseboard = JSON.parse(_json);

    return [[psdata], _json];
}

export default wmicBaseboard;