import { faceletsIdx, edgeLocations } from "../public/DBs/dbs.mjs";

function findYellowEdges(cube) {
    const edges = [];

    // Loop over each face's edge locations and check for yellow color
    for (const edge of edgeLocations) {
        const face = edge.face;
        for (const [row, col] of edge.positions) {
            if (cube.faces[face][row][col] === 'Y') {
                edges.push({ face, position: [row, col] });
            }
        }
    }

    return edges;
}

async function getCrossFromCsv([g, o, b, r]) {
    try {
        // Use fetch to read the CSV file as text
        const response = await fetch('../public/DBs/cross.csv');
        const data = await response.text();

        // Split the content into rows
        const rows = data.split('\n');

        // Loop through each row
        for (let row of rows) {
            // Split each row into columns (boxes)
            const boxes = row.split(',');

            // Ensure the row has at least 6 columns before proceeding
            if (boxes.length < 6) continue;
            // Check if the columns match the values
            if (boxes[1]?.trim() == g && boxes[2]?.trim() == o && boxes[3]?.trim() == b && boxes[4]?.trim() == r) {
                // Return the matching column (third box)
                return boxes[5]?.trim();
            }
        }

        // If no matching row is found
        return null;
    } catch (err) {
        console.error('Error fetching the file:', err);
    }
}

export async function solveCross(cube) {
    const yellowEdgesLocations = findYellowEdges(cube);
    const positions = [-1, -1, -1, -1];
    for (const edge of yellowEdgesLocations) {
        const col = cube.edgeOtherColor(edge.face, edge.position);
        const facelet = faceletsIdx[edge.face][edge.position];
        if (col === 'G') {
            positions[0] = facelet;
        } else if (col === 'O') {
            positions[1] = facelet;
        } else if (col === 'B') {
            positions[2] = facelet;
        } else if (col === 'R') {
            positions[3] = facelet;
        }
    }
    const solution = await getCrossFromCsv(positions);
    return solution;
}
