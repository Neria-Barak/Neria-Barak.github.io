import { faceletsIdx, edgeLocations } from "../Statistics/DBs/dbs.mjs";

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

function getKey(facelets) {
    let idx = 0;
    let pow = 1;

    for (const facelet of facelets) {
        idx += pow * facelet;
        pow *= 25;
    }
    return idx;
}

let needToLoad = true;
let rows = []
async function getCrossFromCsv(facelets) {
    if (needToLoad) {
        // Fetch the sorted CSV file
        const response = await fetch('../public/DBs/finalCross.csv');
        const data = await response.text();

        rows = data.split('\n').map(row => row.split(','));
        needToLoad = false;
    }
    try {
        // Get the key to search for
        const key = getKey(facelets);

        // Perform binary search
        let low = 0;
        let high = rows.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midKey = parseInt(rows[mid][0]?.trim());

            if (midKey === key) {
                // Key found, return the associated value (second column)
                return rows[mid][1]?.trim();
            } else if (midKey < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // If no matching key is found
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
