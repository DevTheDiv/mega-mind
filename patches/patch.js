
let fs = require('fs');
let path = require('path');

// replace path for the wasm file in node_modules/yoga-wasm-web/dist/node.js

let yogaPath = path.resolve('.\\node_modules\\yoga-wasm-web\\dist\\node.js');
console.log("Checking:" + yogaPath);
fs.readFile(yogaPath, 'utf8', function(err, data) {
    if(err) return console.log(err);
    if(data.includes(`_(import.meta.url).resolve("./yoga.wasm")`)) {
        console.log("Patching: /node_modules/yoga-wasm-web/dist/node.js");
        data = data.replace(`_(import.meta.url).resolve("./yoga.wasm")`, `__dirname + "/yoga.wasm"`);
        fs.writeFile('./node_modules/yoga-wasm-web/dist/node.js', data, 'utf8', function(err) {
            if(err) return console.log(err);
        });
    }
});

console.log("Done Witch Patching");