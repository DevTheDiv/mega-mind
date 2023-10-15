


interface IWminCompute {
    AddressWidth: number;
    Architecture: number;
    AssetTag: string;
    Availability: number;
    Caption: string; 
    Characteristics: number;
    ConfigManagerErrorCode: number;
    ConfigManagerUserConfig: boolean;
    CreationClassName: string;
    CurrentClockSpeed: number;
    CurrentVoltage: number;
    DataWidth: number;
    Description: string;
    DeviceID: string;
    ErrorCleared: boolean;
    ErrorDescription: string;
    ExtClock: number;
    Family: string;
    L2CacheSize: number;
    L2CacheSpeed: number;
    L3CacheSize: number;
    L3CacheSpeed: number;
    LastErrorCode: number;
    Level: number;
    LoadPercentage: number;
    Manufacturer: string;
    MaxClockSpeed: number;
    Name: string;
    NumberOfCores: number;
    NumberOfEnabledCore: number;
    NumberOfLogicalProcessors: number;
    OtherFamilyDescription: string;
    PartNumber: string;
    PNPDDeviceID: string;
    PowerManagementCapabilities: number[];
    PowerManagementSupported: boolean;
    ProcessorId: string;
    ProcessorType: number;
    Revision: number;
    Role: string;
    SerialNumber: string;
    SocketDesignation: string;
    Status: string;
    StatusInfo: number;
    Stepping: string;
    SystemName: string;
    ThreadCount: number;
    Version: string;
    VoltageCaps: number;
}