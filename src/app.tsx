import React, { FC, FunctionComponent, ReactNode, useEffect, useState } from 'react';

// import React, {useState, useEffect} from 'react';
// import type {ReactNode} from 'react';
import {Box, Text, Spacer} from 'ink';
// import Ascii from "ink-ascii";
import BaseBoard from './components/baseboard';
import Ram from './components/ram';


// import Gradient from 'ink-gradient';
// import BigText from 'ink-big-text';

let sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));



let loadComponent = async (name: string, state: React.Dispatch<React.SetStateAction<React.ReactNode[]>>) => {
    let component = await import(name);
    state((components) => [...components, component.default]);
}


// a loader will wait for an element to be loaded before rendering the app
let a = () => {

    let [components, setComponents] = useState<React.FC<any>[]>([]);
    useEffect(() => {
        // dynamic imports are async
        (async () => {
            let {default: BigText} = await import('ink-big-text');
            // let table = await import('ink-table');
            let {default: Gradient} = await import('ink-gradient');

            setComponents([BigText, Gradient]);
        })();
    }, [])


    if(components.length > 0) {
        let [BigText, Gradient] = components;
        return (
            <Box borderStyle="round" flexDirection="column" alignItems="center"  width={120}>
                <Gradient name="rainbow">
                    <BigText text="Mega Mind"/>
                </Gradient>
                <Box paddingBottom={2}><Text bold>DIAGNOSTICS</Text></Box>
                <Box flexDirection="column" borderStyle="classic" gap={1} padding={2} paddingTop={1} paddingBottom={1}>
                    <Box>
                        <Text bold>Author to Blame:</Text><Text color="green"> @DevTheDiv</Text>
                    </Box>
                    <Text>Problems & Issues: https://github.com/DevTheDiv/mega-mind/issues</Text>
                </Box>
                <BaseBoard/>
                <Ram/>
            </Box>
        );
    }
    return (
        <Box>
        </Box>
    );
};


// fix the type case
let _a = a as unknown as FC<any>;

export default _a;