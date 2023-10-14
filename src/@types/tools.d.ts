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