#!/usr/bin/env node


let inputArr = process.argv.slice(2);
const { log } = require("console");
let fs = require("fs");
let path = require("path"); 
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree")
let organizeObj = require("./commands/organize");
// console.log(inputArr);

let command = inputArr[0];

let types = {
    media: ["mp4", "mkv", "jpg", "png", "peng"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["pdf", "docx", "doc", "xls", "xlsx", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    apps: ["dmg", "exe", "pkg", "deb"]
}

switch (command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        // helpFn();
        helpObj.helpKey();
        break;
    default:
        console.log("Please input right command 🙏🏻");
}





