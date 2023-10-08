
import {PowerShell } from "node-powershell";



const getPartitions = async ()  : Promise<[any[], string]> => {
    let d = PowerShell.$`Get-Partition | ConvertTo-Json`;

    try {
        let {stdout} = await d;

        let log = stdout?.toString() || "";
        let json : Array<any> = JSON.parse(log);


        json = json.map(d => {
            delete d["CimInstanceProperties"];
            delete d["CimSystemProperties"];
            delete d["CimClass"];
            return d;
        });
        return [json, log];
    } catch (e){
        throw e;
    }
}

(async () => {

    let [j] = await getPartitions();

})()