// This is final interface for the middle man drive object that will be used by the app

interface IStorage {
    index: number;
    uniqueId: string;
    serialNumber: string;
    model: string;
    paths: string[],
    capacity: number;
    useableCapacity: number;
    logicalSectorSize: number;
    physicalSectorSize: number;
    totalSectors: number;
    firmware: string;
    mediaType: string;
    busType: string;
    scsi: {
        host: number;
        channel: number;
        target: number;
        lun: number;
    },
    partitionCount: number;
}