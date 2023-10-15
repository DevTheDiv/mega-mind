

import React, {useState, useEffect, FC} from 'react';

// @ts-ignore
import {Box, Text, Spacer} from 'ink';


import ComputeManager from '../api/compute.js';

let a =  (props : {}) => {

    let [data, setData] = useState<ICompute[]>([]);

    useEffect(() => {
        let computeManager = new ComputeManager();

        
        computeManager.init().then(setData);

    }, []);

    if(!data.length) {
        return (
            <Box>
                <Text>Loading Compute Information...</Text>
            </Box>
        );
    }

    return (
        <>
        <Box width={"100%"}  flexDirection="column">
            <Box width={"100%"} paddingLeft={2} paddingTop={2} >
                <Text bold color={"green"}>CPU</Text>
            </Box>
            <Box flexDirection="row" padding={1} paddingLeft={2} paddingRight={2}  alignItems="center" gap={2} >
                <Box height="100%" flexDirection="column">
                    <Text bold>Product:</Text>
                    <Text bold>Serial:</Text>
                    <Text bold>Socket:</Text>
                    <Text bold>Socket Type:</Text>
                    <Text bold>Cores:</Text>
                    <Text bold>vCores:</Text>

                </Box>
                <Box height="100%" flexDirection="column">
                    <Text>{data[0].name}</Text>
                    <Text>{data[0].serialNumber}</Text>
                    <Text>{data[0].socketNumber}</Text>
                    <Text>{data[0].socketType}</Text>
                    <Text>{data[0].coreCount}/{data[0].physicalCoreCount}</Text>
                    <Text>{data[0].logicalCoreCount}/{data[0].threadCount}</Text>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default a;