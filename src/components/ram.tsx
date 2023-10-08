

import React, {useState, useEffect, FC} from 'react';
import {Box, Text, Spacer} from 'ink';

import ram from '../modules/windows/ram';

let a =  (props : {}) => {

    let [data, setData] = useState<IWminDIMM[]>([]);

    useEffect(() => {
        ram()
        .then((ram) => {            
            setData(ram);
        })
        .catch((err) => {
            console.log(err);
            setData([]);
        });
    }, []);

    if(data.length === 0) {
        return (
            <Box>
                <Text>Loading RAM Information...</Text>
            </Box>
        );
    }

    return (
        <>
        <Box width={"100%"}  flexDirection="column">
            <Box width={"100%"} padding={2} paddingBottom={1} paddingTop={1}>
                <Text bold color="green">MEMORY</Text>
            </Box>
            <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2} alignItems="center" width="100%">
                <Box height="100%" flexDirection="row" justifyContent="space-around" width="100%">
                    <Box><Text bold>Locator</Text></Box>
                    <Box><Text bold>Size</Text></Box>
                    <Box><Text bold>Speed</Text></Box>
                    <Box><Text bold>Product</Text></Box>
                    <Box><Text bold>Serial</Text></Box>
                </Box>
            </Box>
            {data.map((ram, i) => {
                return (
                    <Box flexDirection="row" padding={0} paddingLeft={2} paddingRight={2}  alignItems="center" key={i} >
                        <Box height="100%" flexDirection="row" borderStyle="classic" justifyContent="space-around" width="100%">
                            <Box><Text>{ram.BankLabel} - {ram.DeviceLocator}</Text></Box>
                            <Box><Text>{ram.Capacity}</Text></Box>
                            <Box><Text>{ram.ConfiguredClockSpeed}/{ram.Speed}</Text></Box>
                            <Box><Text>{ram.Model || ram.PartNumber}</Text></Box>
                            <Box><Text>{ram.SerialNumber}</Text></Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
        </>
    );
};

// fix the type case
let _a = a as unknown as FC<any>;

export default _a;