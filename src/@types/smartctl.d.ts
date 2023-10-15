interface ISmartctlXAll {
    json_format_version?: (number)[] | null;
    smartctl: Smartctl;
    local_time: LocalTime;
    device?: Device | null;
    model_family?: string | null;
    model_name?: string | null;
    serial_number?: string | null;
    firmware_version?: string | null;
    trim?: TrimOrSeagateFarmLog | null;
    in_smartctl_database?: boolean | null;
    smart_support?: SmartSupport | null;
    smart_status?: SmartStatus | null;
    ata_smart_data?: AtaSmartData | null;
    ata_smart_attributes?: AtaSmartAttributes | null;
    power_on_time?: PowerOnTime | null;
    power_cycle_count?: number | null;
    temperature?: Temperature | null;
    seagate_farm_log?: TrimOrSeagateFarmLog1 | null;
    nvme_pci_vendor?: NvmePciVendor | null;
    nvme_ieee_oui_identifier?: number | null;
    nvme_total_capacity?: number | null;
    nvme_unallocated_capacity?: number | null;
    nvme_controller_id?: number | null;
    nvme_version?: StatusOrRawOrCurrentSelfTestOperationOrNvmeVersion | null;
    nvme_number_of_namespaces?: number | null;
    nvme_namespaces?: (NvmeNamespacesEntity)[] | null;
    user_capacity?: SizeOrCapacityOrUtilizationOrUserCapacity | null;
    logical_block_size?: number | null;
    nvme_smart_health_information_log?: NvmeSmartHealthInformationLog | null;
    nvme_error_information_log?: NvmeErrorInformationLog | null;
    nvme_self_test_log?: NvmeSelfTestLog | null;
}
interface Smartctl {
    version?: (number)[] | null;
    pre_release: boolean;
    svn_revision: string;
    platform_info: string;
    build_info: string;
    argv?: (string)[] | null;
    messages?: (MessagesEntity)[] | null;
    exit_status: number;
    drive_database_version?: DriveDatabaseVersion | null;
}
interface MessagesEntity {
    string: string;
    severity: string;
}
interface DriveDatabaseVersion {
    string: string;
}
interface LocalTime {
    time_t: number;
    asctime: string;
}
interface Device {
    name: string;
    info_name: string;
    type: string;
    protocol: string;
}
interface TrimOrSeagateFarmLog {
    supported: boolean;
}
interface SmartSupport {
    available: boolean;
    enabled: boolean;
}
interface SmartStatus {
    passed: boolean;
    nvme?: Nvme | null;
}
interface Nvme {
    value: number;
}
interface AtaSmartData {
    offline_data_collection: OfflineDataCollection;
    self_test: SelfTest;
    capabilities: Capabilities;
}
interface OfflineDataCollection {
    status: Status;
    completion_seconds: number;
}
interface Status {
    value: number;
    string: string;
    passed?: boolean | null;
}
interface SelfTest {
    status: Status1;
    polling_minutes: PollingMinutes;
}
interface Status1 {
    value: number;
    string: string;
    passed: boolean;
}
interface PollingMinutes {
    short: number;
    extended: number;
}
interface Capabilities {
    values?: (number)[] | null;
    exec_offline_immediate_supported: boolean;
    offline_is_aborted_upon_new_cmd: boolean;
    offline_surface_scan_supported: boolean;
    self_tests_supported: boolean;
    conveyance_self_test_supported: boolean;
    selective_self_test_supported: boolean;
    attribute_autosave_enabled: boolean;
    error_logging_supported: boolean;
    gp_logging_supported: boolean;
}
interface AtaSmartAttributes {
    revision: number;
    table?: (TableEntity)[] | null;
}
interface TableEntity {
    id: number;
    name: string;
    value: number;
    worst: number;
    flags: Flags;
    raw: StatusOrRawOrCurrentSelfTestOperationOrNvmeVersion1;
}
interface Flags {
    value: number;
    string: string;
    prefailure: boolean;
    updated_online: boolean;
    performance: boolean;
    error_rate: boolean;
    event_count: boolean;
    auto_keep: boolean;
}
interface StatusOrRawOrCurrentSelfTestOperationOrNvmeVersion1 {
    value: number;
    string: string;
}
interface PowerOnTime {
    hours: number;
}
interface Temperature {
    current: number;
}
interface TrimOrSeagateFarmLog1 {
    supported: boolean;
}
interface NvmePciVendor {
    id: number;
    subsystem_id: number;
}
interface StatusOrRawOrCurrentSelfTestOperationOrNvmeVersion {
    value: number;
    string: string;
}
interface NvmeNamespacesEntity {
    id: number;
    size: SizeOrCapacityOrUtilizationOrUserCapacity1;
    capacity: SizeOrCapacityOrUtilizationOrUserCapacity1;
    utilization: SizeOrCapacityOrUtilizationOrUserCapacity1;
    formatted_lba_size: number;
    eui64: Eui64;
}
interface SizeOrCapacityOrUtilizationOrUserCapacity1 {
    blocks: number;
    bytes: number;
}
interface Eui64 {
    oui: number;
    ext_id: number;
}
interface SizeOrCapacityOrUtilizationOrUserCapacity {
    blocks: number;
    bytes: number;
}
interface NvmeSmartHealthInformationLog {
    critical_warning: number;
    temperature: number;
    available_spare: number;
    available_spare_threshold: number;
    percentage_used: number;
    data_units_read: number;
    data_units_written: number;
    host_reads: number;
    host_writes: number;
    controller_busy_time: number;
    power_cycles: number;
    power_on_hours: number;
    unsafe_shutdowns: number;
    media_errors: number;
    num_err_log_entries: number;
    warning_temp_time: number;
    critical_comp_time: number;
    temperature_sensors?: (number)[] | null;
}
interface NvmeErrorInformationLog {
    size: number;
    read: number;
    unread: number;
}
interface NvmeSelfTestLog {
    current_self_test_operation: StatusOrRawOrCurrentSelfTestOperationOrNvmeVersion1;
}
  