

import os from 'os';
import compute from "../modules/windows/compute.js";



class ComputeManager {

    devices: ICompute[] = [];
    
    async init() {
        switch (os.platform()) {
            case 'win32':
                await this.loadWin();
                break;
            default:
                break;
        }
        return this.devices;
    }

    async loadWin() {
        let [_compute] = await compute();

        if(!_compute) return this.devices;

        for(let c in _compute){
            let {Name, Description, SerialNumber, PartNumber, CurrentClockSpeed, MaxClockSpeed, CurrentVoltage, NumberOfCores, NumberOfLogicalProcessors, NumberOfEnabledCore, ThreadCount, ProcessorId, SocketDesignation, DeviceID} = _compute[c];
            this.devices.push({
                name: Name,
                description: Description,
                socketNumber: DeviceID,
                serialNumber: SerialNumber,
                partNumber: PartNumber,
                currentSpeed: CurrentClockSpeed,
                maxSpeed: MaxClockSpeed,
                currentVoltage: CurrentVoltage,
                coreCount: NumberOfCores,
                physicalCoreCount: NumberOfEnabledCore,
                logicalCoreCount: NumberOfLogicalProcessors,
                threadCount: ThreadCount,
                processorId: ProcessorId,
                socketType: SocketDesignation
            });
        }
        return this.devices;
    }

}

export default ComputeManager;