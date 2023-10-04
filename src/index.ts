//https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive?view=windows-11



// to get a list of almost all Win32 classes
// Get-WMIObject -List| Where{$_.name -match "^Win32_"} | Sort Name | Format-Table Name


// to get all friendly names of wmic
// wmic alias get friendlyname,target

//@ts-ignore
import * as nwmi from "node-wmi";

import si from "systeminformation";

import edge from "edge-js";

import librehardwaremonitor from "node-librehardwaremonitor";
import product from "./modules/product";
import drive from "./modules/storage/drive";
import memory from "./modules/ram";
import baseboard from "./modules/baseboard";
import { updateTicket, getTicket} from "./modules/busyBench";
import "./modules/storage/part";

import dotEnv from "dotenv";
dotEnv.config();



async function main() {

    // // getTicket("275384");


    // let p = await product();
    // let body = `<h3>Product Scan</h3></br><pre>${JSON.stringify(p, null, 2)}</pre>`
    // let b = await baseboard();
    // body += `<h3>Baseboard Scan</h3></br><pre>${JSON.stringify(b, null, 2)}</pre>`
    let d = await drive()
    // body += `<h3>Drive Scan</h3></br><pre>${JSON.stringify(d, null, 2)}</pre>`
    // let m = await memory();
    // body += `<h3>DIMM Scan</h3></br><pre>${JSON.stringify(m, null, 2)}</pre>`
    // // updateTicket("275384", body);

    

    // si.system(s => {
    //     console.log(s);
    // })
    // si.baseboard((d) => {
    //     console.log(d)
    // });

    // si.chassis((c) => {
    //     console.log(c);
    // })
    // si.memLayout((m) => {
    //     console.log(m);
    // })

    // si.diskLayout((drives) => {
    //     console.log(drives);
    // })  
    // si.graphics((g) => {
    //     console.log(g);
    // })  
}


main();