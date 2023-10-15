
import React, {useState, useEffect, FC} from 'react';
// @ts-ignore
import {Box, Text, Spacer} from 'ink';

import StorageManager from '../api/storage.js';
// @ts-ignore

import Spinner from 'ink-spinner';

export default ({storage = []} : {storage: IStorage[]}) => {
    let data = storage;
    return (
        <>
        <Box width={"100%"}  flexDirection="column">
            <Box width={"100%"} padding={2} paddingBottom={1} paddingTop={1}>
                <Text bold color="green">STORAGE</Text>
            </Box>
            <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2} alignItems="center" width="100%">
                <Box height="100%" flexDirection="row" justifyContent="space-around" width="100%">
                    {/* <Box><Text bold>Locator</Text></Box>
                    <Box><Text bold>Size</Text></Box>
                    <Box><Text bold>Speed</Text></Box>
                    <Box><Text bold>Product</Text></Box>
                    <Box><Text bold>Serial</Text></Box> */}
                </Box>
            </Box>
            {data.map((device, i) => {
                return (
                    <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2}  alignItems="center" key={i} >
                        <Box height="100%" flexDirection="row" borderStyle="classic" justifyContent="space-around" width="100%">
                            <Box><Text>{device.scsi.channel}:{device.scsi.host}:{device.scsi.lun}:{device.scsi.target}</Text></Box>
                            <Box><Text>{device.paths[0]}</Text></Box>
                            <Box><Text>{device.serialNumber || device.uniqueId}</Text></Box>
                            <Box><Text>{device.model}</Text></Box>
                            <Box><Text>{device.busType}</Text></Box>

                        </Box>
                    </Box>
                );
            })}
        </Box>
        </>
    );
};