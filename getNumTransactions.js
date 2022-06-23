'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
      return inputString[currentLine++];
}

const axios =  require('axios');

async function getNumTransactions(username) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
    try {
        const {data} = await axios.get(`https://jsonmock.hackerrank.com/api/article_users?username=${username}`);
        if(data.data && data.data.length !==0){
            const userID = data.data[0].id;
            const response = await axios.get(`https://jsonmock.hackerrank.com/api/transactions?&userId=${userID}`)
            return response.data.total;
        } else {
            return "Username Not Found";
        } 
    } catch (error){
        console.log(error);
    }
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const username = readLine().trim();
    const result = await getNumTransactions(username);
    ws.write(result.toString());
}'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
      return inputString[currentLine++];
}

const axios =  require('axios');

async function getNumTransactions(username) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
    try {
        const {data} = await axios.get(`https://jsonmock.hackerrank.com/api/article_users?username=${username}`);
        if(data.data && data.data.length !==0){
            const userID = data.data[0].id;
            const response = await axios.get(`https://jsonmock.hackerrank.com/api/transactions?&userId=${userID}`)
            return response.data.total;
        } else {
            return "Username Not Found";
        } 
    } catch (error){
        console.log(error);
    }
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const username = readLine().trim();
    const result = await getNumTransactions(username);
    ws.write(result.toString());
}