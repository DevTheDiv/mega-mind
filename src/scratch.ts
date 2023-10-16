



import { smartXAllInfo } from "./modules/tools/smartctl";


let drives = ["/dev/sda", "/dev/sdb", "/dev/sdc", "/dev/sdd", "/dev/sde", "/dev/sdf"];

smartXAllInfo(drives[0]).then((info) => {

    console.log(info)
});

smartXAllInfo(drives[3]).then((info) => {

    console.log(info)
});

for(let d of drives) {
    smartXAllInfo(d).then((info) => {


        let isNVME = info.device?.protocol?.toLowerCase() == "nvme";

        console.log("")
        
        console.log("Device: ", d, " ",info.model_name, " ", info.device?.protocol);
        console.log("Smart Support Enabled:", info.smart_support?.available);
        console.log("Smart Status Healthy: ", info.smart_status?.passed);
        console.log("Power Cycle Count: ", info.power_cycle_count);
        console.log("Hourse Powered On: ",  info.power_on_time?.hours, "hours");
        console.log("Temp: ", info.temperature?.current, "/", info.temperature?.limit_max || 75);
        console.log("Exit: ", info.smartctl.exit_status)
        // console.log(info.form_factor);
        // console.log(info.device);
        // console.log(info.interface_speed)

        console.log("")

    });
}