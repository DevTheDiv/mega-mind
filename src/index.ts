//https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive?view=windows-11

//https://github.com/vadimdemedes/ink


// to get a list of almost all Win32 classes
// Get-WMIObject -List| Where{$_.name -match "^Win32_"} | Sort Name | Format-Table Name
//https://www.npmjs.com/package/nd-table
//https://www.npmjs.com/package/termx-markup
//https://www.npmjs.com/package/chalk-mate

//https://www.npmjs.com/package/as-table
//https://www.npmjs.com/package/ascii-art
//https://www.npmjs.com/package/columnify
//https://www.npmjs.com/package/ansi-align
//https://vangware.com/libraries/vangware_ansi/#-node


//@ts-ignore
globalThis.navigator = {
    userAgent: 'node.js' // Simulate a user agent to satisfy openpgp.js dependencies
};



import React from "react";
import * as dotEnv from "dotenv";
//@ts-ignore
import {render} from "ink";

import App from "./app.js";


dotEnv.config();


(async() => {

    render(
        React.createElement(App)
    );
    
})();
