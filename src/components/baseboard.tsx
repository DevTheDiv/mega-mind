

// @ts-ignore
import {Box, Text, Spacer} from 'ink';


export default (props : {baseboard: IBaseboard[]}) => {
    let baseboard = props.baseboard;
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
                    <Text>{baseboard[0].partNumber}</Text>
                    <Text>{baseboard[0].serialNumber}</Text>
                    <Text>{baseboard[0].manufacturer}</Text>
                </Box>
            </Box>
        </Box>
        </>
    );
};