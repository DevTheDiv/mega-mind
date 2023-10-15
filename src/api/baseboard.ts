

import os from 'os';
import winboard from "../modules/windows/baseboard.js";


class BoardManager {
    devices: IBaseboard[] = [];
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
        
        let [_board] = await winboard();
        if(!_board) return; 

        for (let b in _board ){
            let {SerialNumber, PartNumber, Manufacturer, Product, Version} = _board[b];
            this.devices.push({
                serialNumber: SerialNumber,
                partNumber: PartNumber || Product,
                manufacturer: Manufacturer
            });
        }
    }
}

export default BoardManager;