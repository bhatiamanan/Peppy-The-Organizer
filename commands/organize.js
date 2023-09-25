let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "jpg", "png", "peng"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["pdf", "docx", "doc", "xls", "xlsx", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    apps: ["dmg", "exe", "pkg", "deb"]
} 
function organizeFn(dirPath){
    // console.log("Organize command implemented for", dirPath);
    // 1. input me directory ka path given hoga
    let destPath;
    if(dirPath==undefined){
        // console.log("Kindly enter the path");   // This is only to use here
        destPath = process.cwd();  // This will make path equals to current working directory
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            destPath = path.join(dirPath,"organized_files"); //isse sirf path bna h, file nhi
            if(fs.existsSync(destPath)==false){ //if there is no such file named organized_files then only we 
                fs.mkdirSync(destPath);       //create a new folder in current working directory with name organized
            }
            // 2. hme usme ek directory create krni hogi organized_files k naam se
        }else{
            console.log(`${dirPath} doesn't exist, Kindly enter the correct path.`);
            return;
        }
    }

    
    
    organizeHelper(dirPath,destPath);
    
}
function organizeHelper(src, dest){
    // 3. identify categories of all the files
    let childName = fs.readdirSync(src); //this will get us all the names of the children from the source
    //  console.log(childName);              // an array basically

    for(let i=0;i<childName.length;i++){
        let childAddress = path.join(src,childName[i]);
        let isFile = fs.statSync(childAddress).isFile();// this is used to check whether it's a file
        if(isFile){
            // console.log(childName[i]);
            // 4. copy or cut files from input directory to organized_files directory
            let category = getCategory(childName[i]);
            // console.log(childName[i], "belong to ----->", category);
            sendFiles(childAddress, dest, category);
        }
    }
}
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1); // there will be a dot in extension and we havnt used dot in our types object(line 9)
    // console.log(ext);
    for(let type in types){
        let currentArrType = types[type];
        for(let i=0;i<currentArrType.length;i++){
            if(ext==currentArrType[i]){
                return type;
            }
        }
    }
    return "Other Unknown Type";
}
function sendFiles(srcFilePath, dest, category){
    // now if we dont have media, archieve, documents etc folder in our organized_files
    // then we have to create them, otherwise copy paste there only
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let desFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath, desFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to ->", category);

}
module.exports={
    organizeKey:organizeFn    
}