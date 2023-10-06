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

import product from "./modules/product";
import drive from "./modules/storage/drive";
import memory from "./modules/ram";
import baseboard from "./modules/baseboard";
import { updateTicket, getTicket} from "./modules/busyBench";
import partitions from "./modules/storage/part";
import inquirer from 'inquirer';

//@ts-ignore
import { input } from '@inquirer/prompts';
//@ts-ignore
import cliHtml from "cli-html";

import * as dotEnv from "dotenv";


//@ts-ignore
import {render} from 'ink';
import React from "react";



import Loading from "./components/loading";


dotEnv.config();


async function main() {




    const answer = await input({ message: 'Enter your name' });

    console.log(answer);

    
    const html = `
        <table>
            <tbody>
                <tr>
                    <td colspan="6">Mega Mind Diagnostic Report</td>
                </tr>
                <tr>
                    <td colspan="6">By DevTheDiv</td>
                </tr>
            </tbody>
        </table>
        <table style="width: 145px;">
            <tbody>
                <tr>
                    <td style="width: 30px;">dev</td>
                    <td style="width: 30px;">dev</td>
                    <td style="width: 22.05px;">ds</td>
                    <td style="width: 17.95px;">sf</td>
                    <td style="width: 18px;">sf</td>
                    <td style="width: 26px;">asf</td>
                </tr>
                <tr>
                    <td style="width: 30px;">asf</td>
                    <td style="width: 30px;">asf</td>
                    <td style="width: 22.05px;">sf</td>
                    <td style="width: 17.95px;">asf</td>
                    <td style="width: 18px;">sf</td>
                    <td style="width: 26px;">a</td>
                </tr>
                <tr>
                    <td style="width: 30px;">asf</td>
                    <td style="width: 30px;">sf</td>
                    <td style="width: 22.05px;">sf</td>
                    <td style="width: 17.95px;">fs</td>
                    <td style="width: 18px;">a</td>
                    <td style="width: 26px;">asf</td>
                </tr>
            </tbody>
        </table>
    `;

    console.log(cliHtml(html));

    console.log("LOL", answer);
    // // getTicket("275384");


    render(React.createElement(Loading, { message: "Loading" }));


    // let p = await product();
    // console.log(p)
    // let body = `<h3>Product Scan</h3></br><pre>${JSON.stringify(p, null, 2)}</pre>`
    // let b = await baseboard();
    // console.log(b);
    // body += `<h3>Baseboard Scan</h3></br><pre>${JSON.stringify(b, null, 2)}</pre>`
    // let d = await drive()
    // console.log(b);

    // for(let i = 0; i !== d.length; i++) {
    //     let drive = d[i];

    //     console.log("drive", drive.index)
    //     let p = await partitions(drive.index);
    //     console.log(p);
    // }



    

    // console.log(`${boxen('foo bar', {width: 100})}${boxen('foo bar', {
    //     width: 100,
    //     align: 'center',
    // })}`);
    // // console.log(boxen('unicorns love rainbows', {title: 'magical', titleAlignment: 'center'}));
    // // console.log(boxen('unicorns love rainbows', {title: 'magical', titleAlignment: 'center'}));
    // // console.log()
    // // boxen
    // // let p = await product(); 
    // // body += `<h3>Drive Scan</h3></br><pre>${JSON.stringify(d, null, 2)}</pre>`
    // // let m = await memory();
    // // body += `<h3>DIMM Scan</h3></br><pre>${JSON.stringify(m, null, 2)}</pre>`
    // // // updateTicket("275384", body);
    
    
    // let boxGen  = new BoxGenerator();

    // // console.log(b);

    // let customBorders = {
    //     "TopRight": "╗",
    //     "TopLeft": "╔",
    //     "BottomRight": "╝",
    //     "BottomLeft": "╚",
    //     "HorizontalSeparator": "═",
    //     "VerticalSeparator": "║",
    //     "TopJunction": "╦",
    //     "BottomJunction": "╩",
    //     "MiddleJunction": "╬",
    //     "LeftJunction": "╠",
    //     "RightJunction": "╣",
    // }
    // const index = boxGen.addPreset(customBorders);
    // boxGen.setPreset(index);

    // // @ts-ignore
    // let _p : BoxTemplate = [["Product │ " + b.Product, "Manufacturer │ " + b.Manufacturer], ["Serial Number │ " + b.SerialNumber, "Version │ " + b.Version]];
    // let productBox = boxGen.generate(_p, {
    //     overflow: "newline",
    //     title: {
    //         content: "MOTHERBOARD",
    //         align: "center",
    //         color: "FFFFFF",
    //     }
    // });
    // console.log(productBox);


    
    // const template = [
    //     ["Hello", "World"]
    // ];
    



    // customBorders = {
    //     ...customBorders,
    //     "TopRight": "╣",
    //     "TopLeft": "╠",
    //     "BottomRight": "╝",
    //     "BottomLeft": "╚",
    //     "HorizontalSeparator": " ",
    //     "VerticalSeparator": "║",
    //     "TopJunction": "╦",
    //     "BottomJunction": "╩",
    //     "MiddleJunction": "╬",
    //     "LeftJunction": "╠",
    //     "RightJunction": "╣",
    // }
    // const middle = boxGen.addPreset(customBorders);
    // boxGen.setPreset(middle);



   

    // const box = boxGen.generate(template, {
    //     overflow: "newline",
    //     title: {
    //         content: "DRIVES",
    //         align: "center",
    //         color: "FFFFFF",
    //     }
    // });

    // console.log(box)
    

    
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