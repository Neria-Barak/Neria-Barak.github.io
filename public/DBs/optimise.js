const fs = require('fs');
const readline = require('readline');

const inputFilePath = 'C:\\Users\\User\\Videos\\Projects\\Rubiks Cube\\public\\DBs\\1LLLDB.txt';
const sortedFilePath = 'C:\\Users\\User\\Videos\\Projects\\Rubiks Cube\\public\\DBs\\finalCross.csv';

// Function to sort the CSV
async function sortCSV() {
    const inputStream = fs.createReadStream(inputFilePath);
    const rl = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity
    });

    let rows = [];

    for await (const line of rl) {
        rows.push(line.split(','));
    }    

    let fivetwelve = Math.pow(5, 12);
    for (let row of rows) {
        if (row[0] < fivetwelve) console.log(row);
    }

    console.log(`Sorted CSV has been written to ${sortedFilePath}`);
}

sortCSV().catch(console.error);
