
import React, {useState, useEffect, FC} from 'react';
// @ts-ignore
import {Box, Text, Spacer, measureElement} from 'ink';

import {filesize} from "filesize";

import {v4} from "uuid";



interface disk {
    scsi: string,
    path: string,
    model: string,
    serial: string,
    bus: string,
    capacity: string,
}

interface smart {
    temperature: string,
    healthy: boolean,
    hours: string,
}

interface partition {
    partitionNumber: number,
    identifier: string,
    fileSystem: string,
    label: string,
    size: number,
    sizeString: string,
    sizeRemaining: number,
    health: string,
    active: boolean,
    boot: boolean,
    readonly: boolean,
    percentageLeft: number,
}

let icons = {
    encrypted: "⛓️",
    locked: "🔒",
    unlocked: "🔓",
    key: "🔑",
 
    active: "🎯",
    bootable: "🥾",

    windows: "🪟",
    linux: "🐧",
    apple: "🍎",

    readonly: "🔏",

    write: "✏️",
    read: "📖",
};

// data can only be flat and have no object types
let Disk = ({data, gap, minWidth} : {data: disk, gap:number, minWidth: any }) => {

    let titles = Object.keys(data);
    let values = Object.values(data);

    return (
        <Box width={"100%"} flexDirection="row" gap={gap} justifyContent="space-between">
            <Box minWidth={minWidth.scsi}><Text>{data.scsi}</Text></Box>
            <Text>│</Text>
            <Box minWidth={minWidth.path}><Text>{data.path}</Text></Box>
            <Text>│</Text>
            <Box minWidth={minWidth.model} flexGrow={1}><Text>{data.model}</Text></Box>
            <Text>│</Text>
            <Box minWidth={minWidth.serial}><Text>{data.serial}</Text></Box>
            <Text>│</Text>
            <Box minWidth={minWidth.bus}><Text>{data.bus}</Text></Box>
            <Text>│</Text>
            <Box minWidth={minWidth.capacity}  alignSelf="flex-end" justifyContent="flex-end"><Text>{data.capacity}</Text></Box>
            {/* { values.map((value, i) => <Box minWidth={minWidth[titles[i]]}><Text key={i}>{value}</Text></Box>) } */}
        </Box>
    );

};

let Smart = ({data, minWidth} : {data: smart,  minWidth: any }) => {
    return (
        <>
            <Box  flexDirection="row" gap={1}>
                <Text dimmed>†</Text>
                <Box minWidth={minWidth.healthy}><Text dimmed color={data.healthy ? "green" : "red"}>{data.healthy ? "HEALTHY" : "UNHEALTHY"}</Text></Box>
                <Text dimmed>○</Text>
                <Box minWidth={minWidth.temperature}><Text dimmed>Temparature (cur/max): {data.temperature}</Text></Box>
                <Text dimmed>○</Text> 
                <Box minWidth={minWidth.hours}><Text dimmed color="blue">Hours: {data.hours}</Text></Box>
            </Box>
        </>
    )

}

let Partition = ({data, minWidth, gap = 0} : {data: partition, minWidth: any, gap: number}) => {
    let flags = [
        data.readonly ? "R" : "*" , 
        data.boot ? "B" : "*",
        data.active ? "A" : "*"
    ];

    let healthState = data.health.toUpperCase();
    let healthColor = "red";
    if(healthState === "HEALTHY") healthColor = "green";
    else if(healthState === "UNKNOWN") healthColor = "yellow";

    return (
    <>
        <Box width={"100%"} flexDirection="row" gap={gap} justifyContent="space-between">
            <Box minWidth={minWidth.partitionNumber + minWidth.identifier + 9}><Text>╰ Part {data.partitionNumber}  </Text><Text bold>{data.identifier}</Text></Box>
            <Box minWidth={3}><Text>{flags.join("")}</Text></Box>
            <Box minWidth={minWidth.fileSystem}><Text>{data.fileSystem}</Text></Box>
            <Box minWidth={minWidth.health}><Text color={healthColor}>{healthState}</Text></Box>
            <Box minWidth={minWidth.label} flexGrow={1}><Text>{data.label}</Text></Box>
            <Box minWidth={minWidth.percentageLeft}><Text>{data.percentageLeft}%</Text></Box>
            <Box minWidth={minWidth.sizeString} alignSelf="flex-end" justifyContent="flex-end"><Text>{data.sizeString}</Text></Box>
        </Box>
    </>
    );
};


function maxSizes(data : {[key:string] : any}, obj : object) {

    for(let key in data) {
        //@ts-ignore
        let value = data[key];
        //@ts-ignore
        obj[key] = obj[key] > `${value}`.length ? obj[key] : `${value}`.length;
    }
}



export default ({storage = []} : {storage: IStorage[]}) => {

    let smartctl : {[key:string] : smart } = {};
    let disks : {[key:string] : disk } = {};
    let diskpartitions : {[key:string] : partition[] } = {};
    
    let maxSizesPartitions = {};
    let maxSizesDisks = {};
    let maxSizesSmart = {};

    for(let i in storage) {
        let {scsi, paths, model, serialNumber, uniqueId, busType, useableCapacity, smart, partitions} = storage[i];

        let uuid = v4();
        let _d = {
            scsi: `${scsi.channel}:${scsi.host}:${scsi.lun}:${scsi.target}`,
            path: paths[0],
            model: model,
            serial: serialNumber || uniqueId,
            bus: busType,
            capacity: filesize(useableCapacity, {round: 2}),
        };
        maxSizes(_d, maxSizesDisks);
        disks[uuid] = _d;

        if(smart?.enabled) {
            let temperature = `${smart.temperature}/${smart.temperatureMax}℃ `;
            let _s = {
                temperature,
                healthy: smart.healthy,
                hours: smart.powerOnHours + "",
            };
            maxSizes(_s, maxSizesSmart);
            smartctl[uuid] = _s;
        }

        if(partitions.length) {
            diskpartitions[uuid] = [];
            
            for(let p in partitions) {
                let partition = partitions[p];
                let {partitionNumber, identifier, size, active, boot, readonly} = partition;
                let { fileSystem = "UNKNOWN", label = "UNKNOWN", size: volumeSize = 1, sizeRemaining = 1, health = "UNKNOWN" } = partition.volume || {};
                
                let percentageLeft = Math.round(sizeRemaining / volumeSize  * 100);

                let _p = {
                    partitionNumber,
                    identifier,
                    fileSystem,
                    label,
                    size,
                    sizeString: filesize(size, {round: 2}),
                    capacity: filesize(useableCapacity, {round: 2}),
                    sizeRemaining,
                    health,
                    active,
                    boot,
                    readonly,
                    percentageLeft
                };
                maxSizes(_p, maxSizesPartitions);
                diskpartitions[uuid].push(_p);
            }
        }
    }
    
    return (
        <>
        <Box width={"100%"}  flexDirection="column"  rowGap={1} padding={1} paddingLeft={2} paddingRight={2} >
            <Box width={"100%"}>
                <Text bold color="green">STORAGE</Text>
            </Box>
            <Box width={"100%"} flexDirection="column" gap={1}>
            {
                Object.keys(disks).map((key, i) =>
                    <Box key={i} flexDirection="column" width="100%">
                        <Disk data={disks[key]} gap={1} minWidth={maxSizesDisks}/>
                        {
                            smartctl[key] ? <Smart data={smartctl[key]} minWidth={maxSizesSmart} /> : <></>
                        }
                        {
                            diskpartitions[key] ? diskpartitions[key].map((partition, i) => {
                                return <Partition key={i} data={partition} minWidth={maxSizesPartitions} gap={2}/>
                            }) : <></>
                        }
                    </Box>
                )
            }
            </Box>
        </Box>
        </>
    );
};