import React, { FC, FunctionComponent, ReactNode, useEffect, useState } from 'react';

import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';


// import Ascii from "ink-ascii";

//@ts-ignore
import {Box, Text}  from "ink";

import BaseBoard from './components/baseboard.js';
import Ram from './components/ram.js';
import Compute from './components/compute.js';

let sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

let loadComponent = async (name: string, state: React.Dispatch<React.SetStateAction<React.ReactNode[]>>) => {
    let component = await import(name);
    state((components) => [...components, component.default]);
}



// a loader will wait for an element to be loaded before rendering the app
export default () => {
    useEffect(() => {

    }, []);

    return (
        <Box borderStyle="round" flexDirection="column" alignItems="center"  width={120}>
            <Gradient name="rainbow">
                <Text bold>Mega Mind</Text>
            </Gradient>
            <Box paddingBottom={2}><Text bold>DIAGNOSTICS</Text></Box>
            <Box flexDirection="column" borderStyle="classic" gap={1} padding={2} paddingTop={1} paddingBottom={1}>
                <Box>
                    <Text bold>Author to Blame:</Text><Text color="green"> @DevTheDiv</Text>
                </Box>
                <Text>Problems & Issues: https://github.com/DevTheDiv/mega-mind/issues</Text>
            </Box>
            <BaseBoard/>
            <Compute/>
            <Ram/>
        </Box>
    );
};