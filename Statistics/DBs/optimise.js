const fs = require('fs');
const readline = require('readline');

const inputFilePath = 'C:\\Users\\User\\Videos\\Projects\\Rubiks Cube\\public\\DBs\\newCross.csv';
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

    // Sort the rows by the first column (key)
    rows.sort((a, b) => {
        // Convert the first column to numbers and compare them
        const keyA = parseFloat(a[0].trim());
        const keyB = parseFloat(b[0].trim());
    
        return keyA - keyB;
    });
    

    // Write the sorted data to the new CSV file
    const outputStream = fs.createWriteStream(sortedFilePath);
    for (let row of rows) {
        outputStream.write(row.join(',') + '\n');
    }

    outputStream.end();
    console.log(`Sorted CSV has been written to ${sortedFilePath}`);
}

sortCSV().catch(console.error);
