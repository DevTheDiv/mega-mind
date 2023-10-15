

import os from 'os';
import compute from "../modules/windows/compute.js";



class ComputeManager {

    compute: ICompute[] = [];
    
    async init() {
        let [_compute] = await compute();

        if(!_compute) return this.compute;

        for(let c in _compute){
            let {Name, Description, SerialNumber, PartNumber, CurrentClockSpeed, MaxClockSpeed, CurrentVoltage, NumberOfCores, NumberOfLogicalProcessors, NumberOfEnabledCore, ThreadCount, ProcessorId, SocketDesignation, DeviceID} = _compute[c];
            this.compute.push({
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
        return this.compute;
    }

}

export default ComputeManager;