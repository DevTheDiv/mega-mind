
import { spawnSync } from "child_process";


import alphanumerize from "alphanumerize";
import { resolve } from "path";
import Papa from "papaparse";


interface IWminDIMM {
    Attributes: number,
    BankLabel: string,
    Capacity: number,
    Caption: string,
    ConfiguredClockSpeed: number,
    ConfiguredVoltage: number,
    DataWidth: 64,
    Description: string, 
    DeviceLocator: string,
    FormFactor: number,
    HotSwappable: unknown,
    InstallDate: unknown,
    InterleaveDataDepth: number,
    InterleavePosition: number,
    Manufacturer: string,
    MaxVoltage: number,
    MinVoltage: number,
    MemoryType: number,
    Model: string,
    Name: string,
    OtherIdentifyingInfo: unknown,
    PositionInRow: number,
    PoweredOn: unknown,
    Removable: unknown,
    Replaceable: unknown,
    SerialNumber: string,
    SKU: unknown,
    SMBIOSMemoryType: number,
    Speed: number,
    Status: unknown,
    Tag: string,
    TotalWidth: number,
    TypeDetail: number,
    version: unknown
}

const wmicDIMMS = () => new Promise<[IWminDIMM[], string]>((accept, reject) =>  {
    let wmic = spawnSync("wmic", [ "memorychip", "get", "*", "/format:csv"], {
        encoding: "utf-8"
    });
    
    if(wmic.error) return reject(wmic.error);

   
    let _wmic = wmic.stdout.toString().replace(/\r\r/g, "");
    // remove first and last characters
    _wmic = _wmic.substring(1, _wmic.length - 1);


    let {data} = Papa.parse<IWminDIMM>(_wmic, {
        delimiter: ",",
        newline: "\n",
        header: true,
        dynamicTyping: true
    });


    accept([data, _wmic]);
})


export default async () => {
    let [e] =  await wmicDIMMS()
    return e;
};