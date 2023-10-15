

interface ICompute {
    name: string;
    description: string;
    serialNumber: string;
    processorId: string;

    socketNumber: string;
    
    partNumber: string;

    currentSpeed: number;
    maxSpeed: number;
    currentVoltage: number;

    coreCount: number;
    physicalCoreCount: number;
    logicalCoreCount: number;
    threadCount: number;
    
    socketType: string;
}