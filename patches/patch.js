
let fs = require('fs');
let path = require('path');


// replace path for the wasm file in node_modules/yoga-wasm-web/dist/node.js

// NOT NEEDED ANYMORE - the patch is applied via webpack
// let yogaPath = path.resolve('.\\node_modules\\yoga-wasm-web\\dist\\node.js');
// console.log("Checking:" + yogaPath);
// fs.readFile(yogaPath, 'utf8', function(err, data) {
//     if(err) return console.log(err);
//     if(data.includes(`_(import.meta.url).resolve("./yoga.wasm")`)) {
//         console.log("Patching: /node_modules/yoga-wasm-web/dist/node.js");
//         data = data.replace(`_(import.meta.url).resolve("./yoga.wasm")`, `__dirname + "/yoga.wasm"`);
//         fs.writeFile('./node_modules/yoga-wasm-web/dist/node.js', data, 'utf8', function(err) {
//             if(err) return console.log(err);
//         });
//     }
// });


let inkPath = path.resolve('.\\node_modules\\ink\\package.json');
console.log("Checking:" + inkPath);
fs.readFile(inkPath, 'utf8', function(err, data) {
    if(err) return console.log(err);
    let exports = {
		".": {
			"types": "./build/index.d.ts",
			"default": "./build/index.js"
		},
		"./build/components/Box" : "./build/components/Box.js",
        "./build/components/Text" : "./build/components/Text.js"
	};

    try {
        let json = JSON.parse(data);
        console.log("Patching: ", inkPath);
        if(json.exports) json.exports = exports;
        fs.writeFileSync(inkPath, JSON.stringify(json, null, 2), 'utf8');
    }
    catch(e) {
        console.log(e);
    }
});

console.log("Done Witch Patching");