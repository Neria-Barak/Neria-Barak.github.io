import fs from 'fs';
import readline from 'readline';
import { RubiksCube } from '../../Solver/cube.js';

function reverseAlg(alg) {
    let moves = alg.split(' ');
    moves = moves.reverse();

    for (let i = 0; i < moves.length; i++) {
        if (moves[i].length === 1) {
            moves[i] = moves[i] + "'";
        } else if (moves[i][1] === "'") {
            moves[i] = moves[i][0];
        }
    }
    return moves.join(' ');
}

function getIdx(cube) {
    const ctn = {'W':0, 'G':1, 'R':2, 'B':3, 'O':4};
    const facelets = [
        cube.faces.B[0][0],
        cube.faces.B[0][1],
        cube.faces.B[0][2],
        cube.faces.L[0][0],
        cube.faces.L[0][1],
        cube.faces.L[0][2],
        cube.faces.F[0][0],
        cube.faces.F[0][1],
        cube.faces.F[0][2],
        cube.faces.R[0][0],
        cube.faces.R[0][1],
        cube.faces.R[0][2],
        cube.faces.U[0][0],
        cube.faces.U[0][1],
        cube.faces.U[0][2],
        cube.faces.U[1][0],
        cube.faces.U[1][1],
        cube.faces.U[1][2],
        cube.faces.U[2][0],
        cube.faces.U[2][1],
        cube.faces.U[2][2]
    ];

    let idx = 0;
    let pow = 1;

    for (const facelet of facelets) {
        idx += pow * ctn[facelet];
        pow *= 5;
    }
    return idx;
}

// const cube = new RubiksCube();
// cube.makeAlg(reverseAlg("R U R' U L' U R U' L R' D' R D' R'"));
// console.log(getIdx(cube));

// Create a read stream for the input file
const inputFile = '1LLL_final.txt';
const outputFile = '1LLLDB.txt'; // Output file to write the transformed lines

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  console: false
});

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFile);

// Process each line from input file
readInterface.on('line', (line) => {
    for (let i = 0; i < 4; i++) {
        let newLine = line;
        if (i === 1) {
            newLine = newLine + ' U';
        } else if (i === 2) {
            newLine = newLine + ' U2';
        } else if (i === 3) {
            newLine = newLine + " U'";
        }

        const cube = new RubiksCube();
        cube.makeAlg(reverseAlg(newLine));
        const idx = getIdx(cube);
        const transformedLine = idx.toString() + "," + newLine + '\n';
        writeStream.write(transformedLine);
    }
});

// Close the write stream when done
readInterface.on('close', () => {
  writeStream.end();
  console.log('Transformation complete. Output written to', outputFile);
});
