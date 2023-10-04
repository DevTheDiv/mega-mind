
// console.log("test");

// nwmi.Query().class("Win32_BIOS").exec((error: Error, data: Object[]) => {
//     console.error(error);
//     console.log(data ? data[0] : "");
// });

// wmic.get_list('nic', (err: Error, data: Object[]) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// wmic.get_list('diskdrive', (err: Error, data: Object[]) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// wmic.get_list('logicaldisk', (err: Error, data: Object[]) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });


// si.cpu()
// .then(data => {
//     console.log(data);
// })

// si.chassis()
// .then(data => {
//     console.log(data);
// });




// let dllPath = "./bin/LibreHardwareMonitorLib.dll";
// setTimeout(()=>{
//     const GetHardwareMessage = {
//         assemblyFile: dllPath,
//         typeName: "LibreHardwareMonitor.Hardware.Sensor",
//         methodName: "Sensor",
//     };
//     edge.func(GetHardwareMessage)(null, (err, res) => {
//         if (err) {
//             console.error(err);
//         }
//         else {
//             console.log(res);
//         }
//     });
//     // const result = await librehardwaremonitor.getHaedwareInfo();
    
//     // const result = await librehardwaremonitor    console.log(result);

// }, 1000)
