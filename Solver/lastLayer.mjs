import { RubiksCube } from "./cube.mjs";

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

let needToLoad = true;
let rows = []
async function getLLFromCsv(idx) {
    if (needToLoad) {
        // Fetch the sorted CSV file
        const response = await fetch('./DBs/1LLLDB.txt');
        const data = await response.text();

        rows = data.split('\n');
        needToLoad = false;
    }
    try {

        // Loop through each row
        for (let row of rows) {
            // Split each row into columns (boxes)

            const boxes = row.split(',');

            if (boxes[0].trim() === idx.toString()) {
                // Return the matching column (third box)
                if (idx < Math.pow(5, 12)) {
                    return boxes[1].trim() + 'H';
                }
                return boxes[1].trim();
            }
        }

        // If no matching row is found
        return null;
    } catch (err) {
        console.error('Error fetching the file:', err);
    }
}

export async function solveLL(cube) {
    const newCube = cube.clone();
    
    let solution = null;
    for (var i = 0; !solution && i < 4; i++) {
        const idx = getIdx(newCube);
        solution = await getLLFromCsv(idx);
    
        newCube.U();
    }
    if (i === 2) {
        solution = "U " + solution;
    } else if (i === 3) {
        solution = "U2 " + solution;
    } else if (i === 4) {
        solution = "U' " + solution;
    }
    return solution;
}