import os from 'os';
import winram from "../modules/windows/ram.js";
import { inherits } from 'util';


// LOOK IRam is defined in the types folder

class RamManager {
    private devices: IRam[] = [];
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

    private async loadWin() {
        let _ram = await winram().catch(console.error);

        if(!_ram) return;

        for(let dimm in _ram ){
            let {Speed, ConfiguredClockSpeed, Capacity, FormFactor, Manufacturer, SerialNumber, PartNumber, BankLabel, DeviceLocator} = _ram[dimm];

            this.devices.push({
                speed: Speed,
                configuredSpeed: ConfiguredClockSpeed,
                capacity: Capacity,
                formFactor: FormFactor.toString(),
                manufacturer: Manufacturer,
                serialNumber: SerialNumber,
                partNumber: PartNumber,
                bank: BankLabel,
                locator: DeviceLocator
            });   
        }
    }
}

export default RamManager;