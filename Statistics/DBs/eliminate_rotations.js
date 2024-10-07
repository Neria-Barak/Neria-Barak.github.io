function rotateMove(move, rotation) {
    const rotationMapping = {
        F: { "X'": 'U', "X": 'D', "Y'": 'L', "Y": 'R', "Z'": 'F', "Z": 'F', 'X2': 'B' },
        B: { "X'": 'D', "X": 'U', "Y'": 'R', "Y": 'L', "Z'": 'B', "Z": 'B', 'X2': 'F' },
        L: { "X'": 'L', "X": 'L', "Y'": 'B', "Y": 'F', "Z'": 'U', "Z": 'D', 'X2': 'L' },
        R: { "X'": 'R', "X": 'R', "Y'": 'F', "Y": 'B', "Z'": 'D', "Z": 'U', 'X2': 'R' },
        U: { "X'": 'B', "X": 'F', "Y'": 'U', "Y": 'U', "Z'": 'R', "Z": 'L', 'X2': 'D' },
        D: { "X'": 'F', "X": 'B', "Y'": 'D', "Y": 'D', "Z'": 'L', "Z": 'R', 'X2': 'U' } 
    }

    let newMove = rotationMapping[move[0]][rotation];
    if (move.length > 1) newMove = newMove + move[1];
    return newMove
}
function transformAlg(alg) {
    const moves = alg.split(' ');
    const rotations = ['X','Y','Z',"X'","Y'","Z'", "X2"];
    if (rotations.includes(moves[moves.length - 1])) moves.splice(moves.length - 1, 1);
    
    for (let i=moves.length-1; i>=0; i--) {
        if (!rotations.includes(moves[i])) continue;
        for (let j = i+1; j<moves.length; j++)
            moves[j] = rotateMove(moves[j], moves[i]);
        moves.splice(i, 1);
    }
    return moves.join(' ');
}
  
const fs = require('fs');
const readline = require('readline');

// Create a read stream for the input file
const inputFile = 'a.txt';
const outputFile = '1LLL_final.txt'; // Output file to write the transformed lines

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  console: false
});

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFile);

// Process each line from input file
readInterface.on('line', (line) => {
  const transformedLine = transformAlg(line.toUpperCase()); // Apply your function to each line
  writeStream.write(transformedLine + '\n'); // Write the transformed line to the output file
});

// Close the write stream when done
readInterface.on('close', () => {
  writeStream.end();
  console.log('Transformation complete. Output written to', outputFile);
});

// console.log(transformAlg("F R' F' L X U R U' L' X'"));

  