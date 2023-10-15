
// This file is used to test the api calls without having to use the cli ui


// import wmicBaseboard from "./modules/windows/baseboard";
// import wmicCompute from "./modules/windows/compute";
import ComputeManager from "./api/compute";


// wmicCompute().then(console.log).catch(console.error);


let cm = new ComputeManager();
cm.init().then(console.log).catch(console.error);