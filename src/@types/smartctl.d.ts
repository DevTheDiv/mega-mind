interface ISmartctlXAll {
    json_format_version?: (number)[] | null;
    smartctl: Smartctl;
    local_time: LocalTime;
    device?: Device | null;
    model_family?: string | null;
    model_name?: string | null;
    serial_number?: string | null;
    wwn?: Wwn | null;
    firmware_version?: string | null;
    user_capacity?: UserCapacityOrSizeOrCapacityOrUtilization | null;
    logical_block_size?: number | null;
    physical_block_size?: number | null;
    rotation_rate?: number | null;
    form_factor?: FormFactor | null;
    trim?: TrimOrSeagateFarmLog | null;
    in_smartctl_database?: boolean | null;
    ata_version?: AtaVersion | null;
    sata_version?: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion | null;
    interface_speed?: InterfaceSpeed | null;
    smart_support?: SmartSupport | null;
    ata_apm?: AtaApm | null;
    read_lookahead?: ReadLookaheadOrWriteCache | null;
    write_cache?: ReadLookaheadOrWriteCache1 | null;
    ata_security?: AtaSecurity | null;
    smart_status?: SmartStatus | null;
    ata_smart_data?: AtaSmartData | null;
    ata_sct_capabilities?: AtaSctCapabilities | null;
    ata_smart_attributes?: AtaSmartAttributes | null;
    power_on_time?: PowerOnTime | null;
    power_cycle_count?: number | null;
    temperature?: Temperature | null;
    ata_log_directory?: AtaLogDirectory | null;
    ata_smart_error_log?: AtaSmartErrorLogOrAtaSmartSelfTestLog | null;
    ata_smart_self_test_log?: AtaSmartErrorLogOrAtaSmartSelfTestLog1 | null;
    ata_smart_selective_self_test_log?: AtaSmartSelectiveSelfTestLog | null;
    ata_sct_status?: AtaSctStatus | null;
    ata_sct_temperature_history?: AtaSctTemperatureHistory | null;
    ata_device_statistics?: AtaDeviceStatistics | null;
    ata_pending_defects_log?: AtaPendingDefectsLog | null;
    sata_phy_event_counters?: SataPhyEventCounters | null;
    seagate_farm_log?: TrimOrSeagateFarmLog1 | null;
    nvme_pci_vendor?: NvmePciVendor | null;
    nvme_ieee_oui_identifier?: number | null;
    nvme_total_capacity?: number | null;
    nvme_unallocated_capacity?: number | null;
    nvme_controller_id?: number | null;
    nvme_version?: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion1 | null;
    nvme_number_of_namespaces?: number | null;
    nvme_namespaces?: (NvmeNamespacesEntity)[] | null;
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
    drive_database_version?: DriveDatabaseVersion | null;
    exit_status: number;
    messages?: (MessagesEntity)[] | null;
}
interface DriveDatabaseVersion {
    string: string;
}
interface MessagesEntity {
    string: string;
    severity: string;
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
interface Wwn {
    naa: number;
    oui: number;
    id: number;
}
interface UserCapacityOrSizeOrCapacityOrUtilization {
    blocks: number;
    bytes: number;
}
interface FormFactor {
    ata_value: number;
    name: string;
}
interface TrimOrSeagateFarmLog {
    supported: boolean;
}
interface AtaVersion {
    string: string;
    major_value: number;
    minor_value: number;
}
interface RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion {
    string: string;
    value: number;
}
interface InterfaceSpeed {
    max: MaxOrCurrent;
    current: MaxOrCurrent;
}
interface MaxOrCurrent {
    sata_value: number;
    string: string;
    units_per_second: number;
    bits_per_unit: number;
}
interface SmartSupport {
    available: boolean;
    enabled: boolean;
}
interface AtaApm {
    enabled: boolean;
    level: number;
    string: string;
    max_performance: boolean;
    min_power: boolean;
    with_standby: boolean;
}
interface ReadLookaheadOrWriteCache {
    enabled: boolean;
}
interface ReadLookaheadOrWriteCache1 {
    enabled: boolean;
}
interface AtaSecurity {
    state: number;
    string: string;
    enabled: boolean;
    frozen: boolean;
    master_password_id: number;
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
    conveyance?: number | null;
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
interface AtaSctCapabilities {
    value: number;
    error_recovery_control_supported: boolean;
    feature_control_supported: boolean;
    data_table_supported: boolean;
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
    thresh?: number | null;
    when_failed?: string | null;
    flags: Flags;
    raw: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion2;
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
interface RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion2 {
    string: string;
    value: number;
}
interface PowerOnTime {
    hours: number;
}
interface Temperature {
    current: number;
    power_cycle_min?: number | null;
    power_cycle_max?: number | null;
    lifetime_min?: number | null;
    lifetime_max?: number | null;
    op_limit_min?: number | null;
    op_limit_max?: number | null;
    limit_min?: number | null;
    limit_max?: number | null;
    lifetime_over_limit_minutes?: number | null;
    lifetime_under_limit_minutes?: number | null;
}
interface AtaLogDirectory {
    gp_dir_version: number;
    smart_dir_version: number;
    smart_dir_multi_sector: boolean;
    table?: (TableEntity1)[] | null;
}
interface TableEntity1 {
    address: number;
    name: string;
    read?: boolean | null;
    write?: boolean | null;
    gp_sectors?: number | null;
    smart_sectors?: number | null;
}
interface AtaSmartErrorLogOrAtaSmartSelfTestLog {
    extended: Extended;
}
interface Extended {
    revision: number;
    sectors: number;
    count: number;
}
interface AtaSmartErrorLogOrAtaSmartSelfTestLog1 {
    extended: Extended;
}
interface AtaSmartSelectiveSelfTestLog {
    revision: number;
    table?: (TableEntity2)[] | null;
    flags: Flags1;
    power_up_scan_resume_minutes: number;
}
interface TableEntity2 {
    lba_min: number;
    lba_max: number;
    status: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion2;
}
interface Flags1 {
    value: number;
    remainder_scan_enabled: boolean;
}
interface AtaSctStatus {
    format_version: number;
    sct_version: number;
    device_state: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion2;
    temperature: Temperature1;
}
interface Temperature1 {
    current: number;
    power_cycle_min: number;
    power_cycle_max: number;
    lifetime_min: number;
    lifetime_max: number;
    under_limit_count: number;
    over_limit_count: number;
    op_limit_max?: number | null;
}
interface AtaSctTemperatureHistory {
    version: number;
    sampling_period_minutes: number;
    logging_interval_minutes: number;
    temperature: Temperature2;
    size: number;
    index: number;
    table?: (number | null)[] | null;
}
interface Temperature2 {
    op_limit_min: number;
    op_limit_max: number;
    limit_min: number;
    limit_max: number;
}
interface AtaDeviceStatistics {
    pages?: (PagesEntity)[] | null;
}
interface PagesEntity {
    number: number;
    name: string;
    revision: number;
    table?: (TableEntity3)[] | null;
}
interface TableEntity3 {
    offset: number;
    name: string;
    size: number;
    value?: number | null;
    flags: Flags2;
}
interface Flags2 {
    value: number;
    string: string;
    valid: boolean;
    normalized: boolean;
    supports_dsn: boolean;
    monitored_condition_met: boolean;
}
interface AtaPendingDefectsLog {
    size: number;
    count: number;
}
interface SataPhyEventCounters {
    table?: (TableEntity4)[] | null;
    reset: boolean;
}
interface TableEntity4 {
    id: number;
    name: string;
    size: number;
    value: number;
    overflow: boolean;
}
interface TrimOrSeagateFarmLog1 {
    supported: boolean;
}
interface NvmePciVendor {
    id: number;
    subsystem_id: number;
}
interface RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion1 {
    string: string;
    value: number;
}
interface NvmeNamespacesEntity {
    id: number;
    size: UserCapacityOrSizeOrCapacityOrUtilization1;
    capacity: UserCapacityOrSizeOrCapacityOrUtilization1;
    utilization: UserCapacityOrSizeOrCapacityOrUtilization1;
    formatted_lba_size: number;
    eui64: Eui64;
}
interface UserCapacityOrSizeOrCapacityOrUtilization1 {
    blocks: number;
    bytes: number;
}
interface Eui64 {
    oui: number;
    ext_id: number;
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
    current_self_test_operation: RawOrStatusOrDeviceStateOrSataVersionOrCurrentSelfTestOperationOrNvmeVersion2;
}
  