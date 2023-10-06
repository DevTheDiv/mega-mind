
import { spawnSync } from "child_process";


import alphanumerize from "alphanumerize";
import { resolve } from "path";
import * as Papa from "papaparse";


interface IWminProduct {
}

const wmicProduct = () => new Promise<[IWminProduct[], string]>((accept, reject) =>  {
    let wmic = spawnSync("wmic", [ "csproduct", "get", "*", "/format:csv"], {
        encoding: "utf-8"
    });
    
    if(wmic.error) return reject(wmic.error);

   
    let _wmic = wmic.stdout.toString().replace(/\r\r/g, "");
    // remove first and last characters
    _wmic = _wmic.substring(1, _wmic.length - 1);


    let {data} = Papa.parse<IWminProduct>(_wmic, {
        delimiter: ",",
        newline: "\n",
        header: true,
        dynamicTyping: true
    });


    accept([data, _wmic]);
})


export default async () => {
    let [e] =  await wmicProduct(); 
    return e;
};