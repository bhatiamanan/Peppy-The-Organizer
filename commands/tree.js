let fs = require("fs");
let path = require("path"); 
function treeFn(dirPath){
    // console.log("Tree command implemented for", dirPath);
    if(dirPath==undefined){
        // console.log("Kindly enter the path");    // This is only to use here
        treeHelper(process.cwd(), "");             // This is to make it global(anywhere in the system)
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            treeHelper(dirPath, "");
        }else{
            console.log(`${dirPath} doesn't exist, Kindly enter the correct path.`);
            return;
        }
    }
}
function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    }else{
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath)
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(dirPath,childrens[i]);
            treeHelper(childPath, indent+"\t");
        }
    }
}
module.exports={
    treeKey: treeFn
}