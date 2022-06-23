'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Image {
    // Add methods here
    url;
    height;
    width;
    constructor(url, size){
        this.url = url;
        this.height = size.height;
        this.width = size.width
        console.log(size)
    }
    getUrl(){
        return this.url;
    }
    setUrl(url){
        this.url =  url;
    }
    setSize(width,height) {
        this.width = width;
        this.height = height;
    }
    getSize(){
        return new Size(this.width, this.height)
    }
    cloneImage(){
        return new Image(this.url, new Size(this.width, this.height))
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    let images = [];
    
    let numberOfImages = parseInt(readLine().trim());
    
    while (numberOfImages-- > 0) {
        let inputs = readLine().trim().split(' ');
        images.push(new Image(inputs[0], new Size(parseInt(inputs[1]), parseInt(inputs[2]))));
    }

    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        let inputs = readLine().trim().split(' ');
        const image = images[parseInt(inputs[1]) - 1];
        const operation = inputs[0];
        
        switch(operation) {
            case 'Clone':
                images.push(image.cloneImage());
                break;
            case 'UpdateUrl':
                image.setUrl(inputs[2]);
                break;
            case 'UpdateSize':
                image.setSize(parseInt(inputs[2]), parseInt(inputs[3]));
                break;
            default:
                break;
        }
    }
    
    images.forEach((img) => {
        const size = img.getSize();
        ws.write(`${img.getUrl()} ${size.width} ${size.height}\n`);
    })
}