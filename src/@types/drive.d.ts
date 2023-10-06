interface IMSFT_PhysicalDisk {
    adapterSerialNumber: string;
    allocatedSize: uint<64>;
    canPool: boolean;
    description: string;
    deviceId: string;
    enclosureNumber: string;
    firmwareVersion: string;
    friendlyName: string;
    fruId: string;
    isIndicationEnabled: boolean;
    isPartial: boolean;
    logicalSectorSize: uint<64>;
    manufacturer: uint<64>;
    model: string;
    objectId: string;
    operationalDetails: string;
    otherCannotPoolReasonDescription: string;
    partNumber: string;
    passThroughClass: string;
    passThroughIds: string;
    passThroughNamespace: string;
    passThroughServer: string;
    physicalLocation: string;
    physicalSectorSize: uint<64>;
    psComputerName: uint<64>;
    serialNumber: string;
    size: uint<64>;
    slotNumber: uint<64>;
    softwareVersion: uint<64>;
    storagePoolUniqueId: uint<64>;
    uniqueId: string;
    virtualDiskFootprint: uint<64>;
    busType: string;
    cannotPoolReason: string;
    className: string;
    healthStatus: string;
    mediaType: string;
    operationalStatus: string;
    spindleSpeed: uint<32>;
    supportedUsages: object[];
    uniqueIdFormat: string;
    usage: string;    
}

interface IWin32_DiskDrive {
    availability: uint<16> | null;
    bytesPerSector: uint<32>;
    capabilities: uint<16>[];
    capabilityDescriptions: string[];
    caption: string;
    compressionMethod: string | null;
    configManagerErrorCode: uint<32>;
    configManagerUserConfig: boolean;
    creationClassName: string;
    defaultBlockSize: uint<64> | null;
    description: string;
    deviceId: string;
    errorCleared: boolean | null;
    errorDescription: string | null;
    errorMethodology: string | null;
    firmwareRevision: string;
    index: uint<32>;
    installDate: string | null;
    interfaceType: string;
    lastErrorCode: uint<32> | null;
    manufacturer: string;
    maxBlockSize: uint<64> | null;
    maxMediaSize: uint<64> | null;
    mediaLoaded: boolean;
    mediaType: string;
    minBlockSize: uint<64> | null;
    model: string;
    name: string;
    needsCleaning: boolean | null;
    numberOfMediaSupported: uint<32> | null;
    partitions: uint<32>;
    pnpDeviceId: string;
    powerManagementCapabilities: uint<16>[] | null;
    powerManagementSupported: boolean | null;
    scsiBus: uint<32>;
    scsiLogicalUnit: uint<16>;
    scsiPort: uint<32>;
    scsiTargetId: uint<16>;
    sectorsPerTrack: uint<32>;
    serialNumber: string;
    signature: uint<32> | null;
    size: uint<64>;
    status: string;
    statusInfo: uint<16> | null;
    systemCreationClassName: string;
    systemName: string;
    totalCylinders: uint<64>;
    totalHeads: uint<32>;
    totalSectors: uint<64>;
    totalTracks: uint<64>;
    tracksPerCylinder: uint<32>;
}


interface ISmartDrive {
    // wwn: string;
    rotationRate: number;
    formFactor: string;
    device: {
        name: string;
        protocol: string;
        type: string;        
    },
    modelFamily: string;
    modelName: string;
    serialNumber: string;
    firmwareVersion: string;
    nvmePciVendor: {
        id: number;
        name: string;
    },
    nvmeIeeeOuiIdentifier: number,
    nvmeTotalCapacity: number,
    nvmeUnallocatedCapacity: number,
    nvmeControllerID: number,
    nvmeVersion: {
        string: string;
        value: number;
    }
    nvmeNumberOfNamespaces: number;
    nvmeNamespaces: [],
    userCapacity: {
        blocks: number;
        bytes: number;
    },
    logicalBlockSize: number;
    trim: { supported: boolean },
    inSmartctlDatabase: boolean;
    smartSupport: {
        available: boolean;
        enabled: boolean;
    }
    
}

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