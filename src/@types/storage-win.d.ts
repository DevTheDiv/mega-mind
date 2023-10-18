//made using https://jvilk.com/MakeTypes/

interface IPSGetDisk {
    CimClass: CimClass;
    CimInstanceProperties?: (string)[] | null;
    CimSystemProperties: CimSystemProperties;
    DiskNumber: number;
    PartitionStyle: string;
    ProvisioningType: string;
    OperationalStatus: string;
    HealthStatus: string;
    BusType: string;
    UniqueIdFormat: string;
    OfflineReason?: null;
    ObjectId: string;
    PassThroughClass?: null;
    PassThroughIds?: null;
    PassThroughNamespace?: null;
    PassThroughServer?: null;
    UniqueId: string;
    AdapterSerialNumber?: null;
    AllocatedSize: number;
    BootFromDisk: boolean;
    FirmwareVersion: string;
    FriendlyName: string;
    Guid?: null;
    IsBoot: boolean;
    IsClustered: boolean;
    IsHighlyAvailable: boolean;
    IsOffline: boolean;
    IsReadOnly: boolean;
    IsScaleOut: boolean;
    IsSystem: boolean;
    LargestFreeExtent: number;
    Location: string;
    LogicalSectorSize: number;
    Manufacturer: string;
    Model: string;
    Number: number;
    NumberOfPartitions: number;
    Path: string;
    PhysicalSectorSize: number;
    SerialNumber: string;
    Signature: number;
    Size: number;
    PSComputerName?: null;
}
  
interface IPSGetPhysicalDisk {
    CimClass: CimClass;
    CimInstanceProperties?: (string)[] | null;
    CimSystemProperties: CimSystemProperties;
    DiskNumber: number;
    PartitionStyle: string;
    ProvisioningType: string;
    OperationalStatus: string;
    HealthStatus: string;
    BusType: string;
    UniqueIdFormat: string;
    OfflineReason?: null;
    ObjectId: string;
    PassThroughClass?: null;
    PassThroughIds?: null;
    PassThroughNamespace?: null;
    PassThroughServer?: null;
    UniqueId: string;
    AdapterSerialNumber?: null;
    AllocatedSize: number;
    BootFromDisk: boolean;
    FirmwareVersion: string;
    FriendlyName: string;
    Guid?: null;
    IsBoot: boolean;
    IsClustered: boolean;
    IsHighlyAvailable: boolean;
    IsOffline: boolean;
    IsReadOnly: boolean;
    IsScaleOut: boolean;
    IsSystem: boolean;
    LargestFreeExtent: number;
    Location: string;
    LogicalSectorSize: number;
    Manufacturer: string;
    Model: string;
    Number: number;
    NumberOfPartitions: number;
    Path: string;
    PhysicalSectorSize: number;
    SerialNumber: string;
    Signature: number;
    Size: number;
    PSComputerName?: null;
}


interface IPSGetPartition {
    CimClass: CimClass;
    CimInstanceProperties?: (string)[] | null;
    CimSystemProperties: CimSystemProperties;
    OperationalStatus: string;
    Type: string;
    DiskPath: string;
    ObjectId: string;
    PassThroughClass?: null;
    PassThroughIds?: null;
    PassThroughNamespace?: null;
    PassThroughServer?: null;
    UniqueId: string;
    AccessPaths?: (string)[] | null;
    DiskId: string;
    DiskNumber: number;
    DriveLetter?: null;
    GptType: string;
    Guid: string;
    IsActive: boolean;
    IsBoot: boolean;
    IsDAX?: null;
    IsHidden: boolean;
    IsOffline: boolean;
    IsReadOnly?: null;
    IsShadowCopy?: null;
    IsSystem: boolean;
    MbrType?: null;
    NoDefaultDriveLetter?: null;
    Offset: number;
    PartitionNumber: number;
    Size: number;
    TransitionState: number;
    PSComputerName?: null;
    Volume?: IPSGetVolume | null;
}

interface IPSGetVolume {
    CimClass: CimClass;
    CimInstanceProperties?: (CimInstancePropertiesEntity)[] | null;
    CimSystemProperties: CimSystemProperties;
    OperationalStatus: string;
    HealthStatus: string;
    DriveType: string;
    FileSystemType: string;
    DedupMode: string;
    ObjectId: string;
    PassThroughClass?: null;
    PassThroughIds?: null;
    PassThroughNamespace?: null;
    PassThroughServer?: null;
    UniqueId: string;
    AllocationUnitSize: number;
    DriveLetter?: string | null;
    FileSystem: string;
    FileSystemLabel: string;
    Path: string;
    Size: number;
    SizeRemaining: number;
    PSComputerName?: null;
}

interface IWin32_DiskDrive {
    CimClass: CimClass;
    CimInstanceProperties?: (string)[] | null;
    CimSystemProperties: CimSystemProperties;
    Caption: string;
    Description: string;
    InstallDate?: null;
    Name: string;
    Status: string;
    Availability?: null;
    ConfigManagerErrorCode: number;
    ConfigManagerUserConfig: boolean;
    CreationClassName: string;
    DeviceID: string;
    ErrorCleared?: null;
    ErrorDescription?: null;
    LastErrorCode?: null;
    PNPDeviceID: string;
    PowerManagementCapabilities?: null;
    PowerManagementSupported?: null;
    StatusInfo?: null;
    SystemCreationClassName: string;
    SystemName: string;
    Capabilities?: (number)[] | null;
    CapabilityDescriptions?: (string)[] | null;
    CompressionMethod?: null;
    DefaultBlockSize?: null;
    ErrorMethodology?: null;
    MaxBlockSize?: null;
    MaxMediaSize?: null;
    MinBlockSize?: null;
    NeedsCleaning?: null;
    NumberOfMediaSupported?: null;
    BytesPerSector: number;
    FirmwareRevision: string;
    Index: number;
    InterfaceType: string;
    Manufacturer: string;
    MediaLoaded: boolean;
    MediaType: string;
    Model: string;
    Partitions: number;
    SCSIBus: number;
    SCSILogicalUnit: number;
    SCSIPort: number;
    SCSITargetId: number;
    SectorsPerTrack: number;
    SerialNumber: string;
    Signature?: null;
    Size: number;
    TotalCylinders: number;
    TotalHeads: number;
    TotalSectors: number;
    TotalTracks: number;
    TracksPerCylinder: number;
    PSComputerName?: null;
}


interface IFSUtilSectorInfo {
    physicalBytesPerSectorForAtomicity: number,
    physicalBytesPerSectorForPerformance: number
}

interface IPSGetPartition {
    CimClass: CimClass;
    CimInstanceProperties?: (string)[] | null;
    CimSystemProperties: CimSystemProperties;
    OperationalStatus: string;
    Type: string;
    DiskPath: string;
    ObjectId: string;
    PassThroughClass?: null;
    PassThroughIds?: null;
    PassThroughNamespace?: null;
    PassThroughServer?: null;
    UniqueId: string;
    AccessPaths?: (string)[] | null;
    DiskId: string;
    DiskNumber: number;
    DriveLetter?: string | null;
    GptType: string;
    Guid: string;
    IsActive: boolean;
    IsBoot: boolean;
    IsDAX?: boolean | null;
    IsHidden: boolean;
    IsOffline: boolean;
    IsReadOnly?: boolean | null;
    IsShadowCopy?: boolean | null;
    IsSystem: boolean;
    MbrType?: null;
    NoDefaultDriveLetter?: boolean | null;
    Offset: number;
    PartitionNumber: number;
    Size: number;
    TransitionState: number;
    PSComputerName?: null;
}
  
  

interface CimClass {
    CimSuperClassName: string;
    CimSuperClass: string;
    CimClassProperties: string;
    CimClassQualifiers: string;
    CimClassMethods: string;
    CimSystemProperties: string;
}
interface CimSystemProperties {
    Namespace: string;
    ServerName: string;
    ClassName: string;
    Path?: null;
}