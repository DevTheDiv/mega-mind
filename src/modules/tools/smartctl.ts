import { spawnSync } from "child_process";
import {camelCase} from "change-case-all";

const _smartctl ="\\Program\ Files\\smartmontools\\bin\\smartctl.exe";


let smartXAllInfo = async (drive: string) : Promise<ISmartctlXAll> =>   {
    let smartctlInfo = spawnSync(_smartctl, ["-j", "-x", drive], {
        encoding: "utf8"
    });

    if(smartctlInfo.error) throw new Error(smartctlInfo.stderr.toString());
    
    let _smartInfo = smartctlInfo.stdout.toString();
    let smartInfo : ISmartctlXAll = JSON.parse(_smartInfo);
        
    return smartInfo;
}

export {
    smartXAllInfo
}
