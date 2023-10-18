
import React, {useState, useEffect, FC} from 'react';
// @ts-ignore
import {Box, Text, Spacer} from 'ink';


import {filesize} from "filesize";


let rows = 4;
let width = 100 / rows + "%";


export default ({storage = []} : {storage: IStorage[]}) => {
    let data = storage;

    let minWidth : {
        serialNumber: number,
        model: number,
        busType: number,
        paths: number,
        useableCapacity: number,
        scsi: number,
    } = {
        serialNumber: 0,
        model: 0,
        busType: 0,
        paths: 0,
        useableCapacity: 0,
        scsi: 0,
    };

    for(let i in storage) {
        let obj = storage[i];
        let keys = Object.keys(obj);
        let values = Object.values(obj);

        for(let j in keys) {
            let key = keys[j];
            let value = values[j] || "";

            if(Object.keys(minWidth).indexOf(key) === -1) continue;

            if(key === "paths") {
                let p = value[0];
                if(p.length > minWidth[key]) minWidth[key] = p.length;
            }
            if(key === "useableCapacity") {
                let p = filesize(value, {round: 2});
                if(p.length > minWidth[key]) minWidth[key] = p.length;
            }
            if(key === "scsi") {
                let p = Object.values(value).join(":");
                if(p.length > minWidth[key]) minWidth[key] = p.length;

            }
            // @ts-ignore
            else if(value.length > minWidth[key]) minWidth[key] = value.length;
        }
    }

    
    return (
        <>
        <Box width={"100%"}  flexDirection="column"  rowGap={1} paddingTop={1} paddingBottom={1}>
            <Box width={"100%"} padding={2} paddingBottom={0} paddingTop={0}>
                <Text bold color="green">STORAGE</Text>
            </Box>       
            {data.map((device, i) => {
                return (
                    <Box key={i} flexDirection="column" width="100%" paddingLeft={2} paddingRight={2}>
                        <Box flexDirection="row" width="100%" padding={0} paddingLeft={0} paddingRight={0}>
                            <Box height="100%" flexDirection="row" width="100%" columnGap={2} justifyContent="space-between">
                                <Box minWidth={minWidth.scsi}><Text>{device.scsi.channel}:{device.scsi.host}:{device.scsi.lun}:{device.scsi.target}</Text></Box>
                                <Text>│</Text>
                                <Box minWidth={minWidth.paths}><Text>{device.paths[0]}</Text></Box>
                                <Text>│</Text>
                                <Box minWidth={minWidth.model} flexGrow={1}><Text>{device.model}</Text></Box>
                                <Text>│</Text>
                                <Box minWidth={minWidth.serialNumber} flexGrow={1}><Text>{device.serialNumber || device.uniqueId}</Text></Box>
                                <Text>│</Text>
                                <Box minWidth={minWidth.busType}><Text>{device.busType}</Text></Box>
                                <Text>│</Text>
                                <Box minWidth={minWidth.useableCapacity}  alignSelf="flex-end" justifyContent="flex-end"><Text>{filesize(device.useableCapacity, {round: 2})}</Text></Box>
                            </Box>
                        </Box>
                        {
                            device.smart?.enabled ? 
                            <Box  flexDirection="row" padding={0} paddingLeft={0} paddingRight={0}  alignItems="center" gap={2}>
                                <Text dimmed>🩺</Text>
                                <Text dimmed color={device.smart.healthy ? "green" : "red"}>Healthy: {`${device.smart.healthy}`}</Text>
                                <Text dimmed>○</Text>
                                <Text dimmed color={device.smart.temperature < device.smart.temperatureMax? "green" : "red"}>Temparature (cur/max): {`${device.smart.temperature}/${device.smart.temperatureMax}`}℃ </Text>
                                <Text dimmed>○</Text>
                                <Text dimmed color="blue">Hours: {`${device.smart.powerOnHours}`}</Text>
                            </Box>
                            :
                            <></>
                        }
                        {
                            device.partitions.map((partition, i) => {
                                
                                let utilized = (partition.volume?.sizeRemaining || 1) / (partition.volume?.size || 1);
                                let healthState = (partition.volume?.health || "Unknown").toString().toUpperCase();
                                
                                let healthColor = "red";
                                if(healthState === "HEALTHY") healthColor = "green";
                                else if(healthState === "UNKNOWN") healthColor = "yellow";

 
                                
                                let flags = [];
                                if(partition.readonly) flags.push("RO");
                                if(partition.boot) flags.push("B");
                                if(partition.active) flags.push("A");

                                return (
                                    <>
                                        <Box key={i} flexDirection="row" gap={2} justifyContent="space-between">
                                            <Text>╰ Part {partition.partitionNumber} ({partition.identifier})</Text>
                                            <Text>[{flags.join(",")}]</Text>
                                            <Text>{partition.volume?.fileSystem}</Text>
                                            <Text>{partition.volume?.label}</Text>
                                            <Text color={healthColor}>{partition.volume?.health}</Text>
                                            <Text>{100 - Math.round(utilized * 100)}%</Text>
                                            <Text>{filesize(partition.size, {round: 2, standard: "jedec"})}</Text>
                                        </Box>
                                    </>
                                );
                            })
                        }
                        
                    </Box>
                );
            })}
        </Box>
        </>
    );
};