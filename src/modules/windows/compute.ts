


import { PowerShell } from "node-powershell";

const wmicCompute = async () : Promise<[IWminCompute[], string]> =>  {
    let ps =  PowerShell.$`Get-WmiObject win32_processor | ConvertTo-Json`;

    let {stderr, stdout } = await ps;

    // spawn example usage
    // let wmic = spawnSync("wmic", [ "baseboard", "get", "*", "/format:csv"], {
    //     encoding: "utf-8"
    // });
    
    let _json = stdout?.toString() || "[]";
    let _err = stderr?.toString() || "";
    
    if(_err) throw new Error(_err);

    let psdata : IWminCompute = JSON.parse(_json);

    return [[psdata], _json];
}

export default wmicCompute;