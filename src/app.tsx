import React, { FC, FunctionComponent, ReactNode, useEffect, useState } from 'react';

import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';


// import Ascii from "ink-ascii";

//@ts-ignore
import {Box, Text}  from "ink";
//@ts-ignore
import Spinner from 'ink-spinner';


import BaseBoard from './components/baseboard.js';
import Ram from './components/ram.js';
import Compute from './components/compute.js';
import Storage from './components/storage.js';



let sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

let loadComponent = async (name: string, state: React.Dispatch<React.SetStateAction<React.ReactNode[]>>) => {
    let component = await import(name);
    state((components) => [...components, component.default]);
}


import BoardManager from './api/baseboard.js';
import ComputeManager from './api/compute.js';
import StorageManager from './api/storage.js';
import RamManager from './api/ram.js';

// a loader will wait for an element to be loaded before rendering the app
export default () => {


    let [baseBoard, setBaseBoard] = useState<any>([]);
    let [compute, setCompute] = useState<any>([]);
    let [storage, setStorage] = useState<any>([]);
    let [ram, setRam] = useState<any>([]);

    let [loading, setLoading] = useState<string>("Getting Ready");




    useEffect(() => {
        let baseboardManager = new BoardManager();
        let computeManager = new ComputeManager();
        let storageManager = new StorageManager();
        let ramManager = new RamManager();


        (async () => {
            sleep(1000);
            setLoading("Loading Baseboard");
            let baseboard = await baseboardManager.init();
            setBaseBoard(baseboard);
            setLoading("Loading Compute");
            let compute = await computeManager.init();
            setCompute(compute);
            setLoading("Loading RAM");
            let ram = await ramManager.init();
            setRam(ram);
            setLoading("Loading Storage");
            let storage = await storageManager.init();
            setStorage(storage);
            setLoading("");
        })();

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
            {
                loading ? 
                (
                    <>
                        <Text color="green"><Spinner type="dots" /> {loading}</Text>
                    </>
                ) : (
                    <>
                        <BaseBoard baseboard={baseBoard}/>
                        <Compute compute={compute}/>
                        <Ram ram={ram}/>
                        <Storage storage={storage}/>
                    </>
                )
            }
        </Box>
    );
};