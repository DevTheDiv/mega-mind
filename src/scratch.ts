

import StorageManager from "./api/storage";


let storage = new StorageManager();


storage.init().then((devices) => {
    console.log(devices);
}).catch(console.error);