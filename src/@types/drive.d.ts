// This is final interface for the middle man drive object that will be used by the app

interface IDrive {
    index: number;
    uniqueId: string;
    serial: string;
    model: string;
    pathLinux: string;
    pathWindows: string;
    mediaType: string;
    busType: string;
    firmware: string;
    partitionStyle?: string;
    size: number;
    logicalSectorSize: number;
    physicalSectorSize: number;
    scsi: {
        host: number;
        channel: number;
        target: number;
        lun: number;
    },
    partitionCount: number;
    wmiDiskDrive: IWin32_DiskDrive;
    smartInfo: ISmartDrive;
}