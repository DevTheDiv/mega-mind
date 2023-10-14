
import React, {useState, useEffect, FC} from 'react';

// @ts-ignore
import {Box, Text, Spacer} from 'ink';

import baseboard from '../modules/windows/baseboard.js';

let a =  (props : {}) => {

    let [data, setData] = useState([{product:  'Loading...', serial: 'Loading...', manufacturer: 'Loading...'}]);

    useEffect(() => {
        baseboard()
        .then((board) => {
            let { Product, SerialNumber, Manufacturer } = board as any;
            setData([{product: Product, serial: SerialNumber, manufacturer: Manufacturer}]);
        })
        .catch((err) => {
            setData([{product: 'Error', serial: 'Error', manufacturer: 'Error'}]);
        });
    }, []);

    if(data[0].product === 'Loading...') {
        return (
            <Box>
                <Text>Loading Board Information...</Text>
            </Box>
        );
    }

    return (
        <>
        <Box width={"100%"}  flexDirection="column">
            <Box width={"100%"} paddingLeft={2} paddingTop={2} >
                <Text bold color={"green"}>BASEBOARD</Text>
            </Box>
            <Box flexDirection="row" padding={1} paddingLeft={2} paddingRight={2}  alignItems="center" gap={2} >
                <Box height="100%" flexDirection="column">
                    <Text bold>Product:</Text>
                    <Text bold>Serial:</Text>
                    <Text bold>Manufacturer:</Text>
                </Box>
                <Box height="100%" flexDirection="column">
                    <Text>{data[0].product}</Text>
                    <Text>{data[0].serial}</Text>
                    <Text>{data[0].manufacturer}</Text>
                </Box>
            </Box>
        </Box>
        </>
    );
};

// fix the type case
let _a = a as unknown as FC<any>;

export default _a;