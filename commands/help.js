function helpFn(){
    console.log(`
        List of all the commands:
            node main.js tree "directoryPath"
            node main.js organize "directoryPath"
            node main.js help
            `);
}
module.exports={
    helpKey: helpFn  //now the function is wrapped in the object and we can export it
}