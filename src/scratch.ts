
// This file is used to test the api calls without having to use the cli ui


import wmicBaseboard from "./modules/windows/baseboard";

wmicBaseboard().then(console.log).catch(console.error);