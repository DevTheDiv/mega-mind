
import React, {useState, useEffect, FC} from 'react';
// @ts-ignore
import {Box, Text, Spacer} from 'ink';

import RamManager from '../api/ram.js';


import {filesize} from "filesize";

let rows = 5;
let width = 100 / rows + "%";

export default ({ram = []} : {ram: IRam[]}) => {
    let data = ram;


    let minWidth = {
        bank: 0,
        locator: 0,
        partNumber: 0,
        serialNumber: 0,
        configuredSpeed: 0,
        speed: 0,
        capacity: 0,
    };

    for(let i in data) {
        let obj = data[i];
        let keys = Object.keys(obj);
        let values = Object.values(obj);

        for(let j in keys) {
            let key = keys[j];
            let value = values[j];

            if(Object.keys(minWidth).indexOf(key) === -1) continue;

            if(key === "locator") {
                let p = value + " " + obj.bank;
                if(p.length > minWidth[key]) minWidth[key] = p.length;
            }
            if(key === "capacity") {
                let p = filesize(value, {round: 2});
                if(p.length > minWidth[key]) minWidth[key] = p.length;
            }
            if(key === "configuredSpeed") {
                let p =  value + "/" + obj.speed;
                if(p.length > minWidth[key]) minWidth[key] = p.length;
            }
            // @ts-ignore
            else if(value.length > minWidth[key]) minWidth[key] = value.length;
        }
    }
    return (
        <>
        <Box width={"100%"}  flexDirection="column">
            <Box width={"100%"} padding={2} paddingBottom={1} paddingTop={1}>
                <Text bold color="green">MEMORY</Text>
            </Box>
            <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2} alignItems="center" width="100%">
                <Box height="100%" flexDirection="row" width="100%" gap={3} paddingLeft={1} paddingRight={1}>
                    <Box minWidth={minWidth.locator}><Text bold>Locator</Text></Box>
                    <Box minWidth={minWidth.partNumber} flexGrow={1}><Text bold>Product</Text></Box>
                    <Box minWidth={minWidth.serialNumber} flexGrow={1}><Text bold>Serial</Text></Box>
                    <Box minWidth={minWidth.configuredSpeed}><Text bold>Speed</Text></Box>
                    <Box minWidth={minWidth.capacity}><Text bold>Size</Text></Box>
                </Box>
            </Box>
            {data.map((ram, i) => {
                return (
                    <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2}  alignItems="center" key={i} >
                        <Box height="100%" flexDirection="row" borderStyle="classic" width="100%" gap={1} paddingLeft={1} paddingRight={1}>
                            <Box minWidth={minWidth.locator}><Text>{ram.bank} {ram.locator}</Text></Box>
                            <Text>|</Text>
                            <Box minWidth={minWidth.partNumber} flexGrow={1}><Text>{ram.partNumber}</Text></Box>
                            <Text>|</Text>
                            <Box minWidth={minWidth.serialNumber} flexGrow={1}><Text>{ram.serialNumber}</Text></Box>
                            <Text>|</Text>
                            <Box minWidth={minWidth.configuredSpeed}><Text>{ram.configuredSpeed}/{ram.speed}</Text></Box>
                            <Text>|</Text>
                            <Box minWidth={minWidth.capacity}><Text>{filesize(ram.capacity, {standard: "jedec"})}</Text></Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
        </>
    );
};