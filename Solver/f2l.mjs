import { adjacentEdges, adjacentCorners } from "../public/DBs/dbs.mjs";
import { RubiksCube } from "./cube.mjs";
import { solveCross } from "./cross.mjs";
import { solveLL } from "./lastLayer.mjs";
import { simplifyAlg, transformAlg } from "./utilities.mjs";

function isOnU(facelet) {
    if (facelet.face === 'U') return true;

    if (facelet.position[0] === 0 && facelet.face !== 'D') return true;

    return false;
}

function getSlot(facelet) {
    switch(facelet.face) {
        case 'R':
            if (facelet.position[1] == 0) return 'FR';
            if (facelet.position[1] == 2) return 'BR';
            break;
        case 'B':
            if (facelet.position[1] == 0) return 'BR';
            if (facelet.position[1] == 2) return 'BL';
            break;
        case 'L':
            if (facelet.position[1] == 0) return 'BL';
            if (facelet.position[1] == 2) return 'FL';
            break;
        case 'F':
            if (facelet.position[1] == 0) return 'FL';
            if (facelet.position[1] == 2) return 'FR';
            break;
        case 'D':
            if (facelet.position[0] === 0 && facelet.position[1] == 0) return 'FL';
            if (facelet.position[0] === 0 && facelet.position[1] == 2) return 'FR';
            if (facelet.position[0] === 2 && facelet.position[1] == 0) return 'BL';
            if (facelet.position[0] === 2 && facelet.position[1] == 2) return 'BR';
            break;
    }
}

function isEdge(facelet) {
    return ((facelet.position[0] + facelet.position[1]) % 2) !== 0;
}

function moveOtherAway(facelet, rotation) {
    if (facelet.face === 'U') {
        const posToRot = {'01':0 ,'12':1 ,'10':2 ,'21':3, '00':0, '02':1, '22':2, '20':3};
        let pos = posToRot[`${facelet.position[0]}${facelet.position[1]}`];

        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        pos = (pos + rotToAdd[rotation]) % 4;

        const posToMove = {0:'', 1:"U' ", 2:'U2 ', 3:'U '};
        return posToMove[pos];
    } else if (isEdge(facelet)) {
        const faceToRot = {'B':0 ,'R':1 ,'F':2 ,'L':3};
        let pos = faceToRot[facelet.face];

        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        pos = (pos + rotToAdd[rotation]) % 4;

        const posToMove = {0:'', 1:"U' ", 2:'U2 ', 3:'U '};
        return posToMove[pos];
    } else {
        let faceToRot;
        if (facelet.position[0] === 0 && facelet.position[1] === 0) {
            faceToRot = {'L':0 ,'B':1 ,'R':2 ,'F':3};
        } else {
            faceToRot = {'B':0 ,'R':1 ,'F':2 ,'L':3};
        }
        
        let pos = faceToRot[facelet.face];

        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        pos = (pos + rotToAdd[rotation]) % 4;

        const posToMove = {0:'', 1:"U' ", 2:'U2 ', 3:'U '};
        return posToMove[pos];
    }
}

function moveToU(edge, corner) {
    let solution = '';
    if (isOnU(edge)) {
        if (isOnU(corner)) return solution;

        const slotToRotation = {'FR':'', 'BR':'y ', 'BL':'y2 ', 'FL':"y' "};
        solution = solution + slotToRotation[getSlot(corner)];
        solution = solution + moveOtherAway(edge, slotToRotation[getSlot(corner)]);
        solution = solution + "R U' R' "
    } else if (isOnU(corner)) {
        const slotToRotation = {'FR':'', 'BR':'y ', 'BL':'y2 ', 'FL':"y' "};
        solution = solution + slotToRotation[getSlot(edge)];
        solution = solution + moveOtherAway(corner, slotToRotation[getSlot(edge)]);
        solution = solution + "R U' R' "
    } else {
        if (getSlot(edge) === getSlot(corner)) {
            const slotToRotation = {'FR':'', 'BR':'y ', 'BL':'y2 ', 'FL':"y' "};
            solution = solution + slotToRotation[getSlot(edge)];
            solution = solution + "R U' R' "
        } else {
            const slotToRotation = {'FR':'', 'BR':'y ', 'BL':'y2 ', 'FL':"y' "};
            const rotation = slotToRotation[getSlot(edge)];
            solution = solution + rotation;
            solution = solution + "R U' R' ";
            const faceAfterRotation = {
                R: {
                  '': 'R',
                  'y ': 'F',
                  'y2 ': 'L',
                  "y' ": 'B'
                },
                B: {
                  '': 'B',
                  'y ': 'R',
                  'y2 ': 'F',
                  "y' ": 'L'
                },
                L: {
                  '': 'L',
                  'y ': 'B',
                  'y2 ': 'R',
                  "y' ": 'F'
                },
                F: {
                  '': 'F',
                  'y ': 'L',
                  'y2 ': 'B',
                  "y' ": 'R'
                },
                U: {
                  '': 'U',
                  'y ': 'U',
                  'y2 ': 'U',
                  "y' ": 'U'
                },
                D: {
                  '': 'D',
                  'y ': 'D',
                  'y2 ': 'D',
                  "y' ": 'D'
                }
            }
            if (corner.face === 'D') {
                const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
                const posToIdx = {'00':3, '02':2, '22':1, '20':0};
                const oldCornerIdx = posToIdx[`${corner.position[0]}${corner.position[1]}`];
                let newCornerIdx = (oldCornerIdx + rotToAdd[rotation]) % 4;
        
                const idxToPos = {0:'20', 1:'22', 2:'02', 3:'00'};
                corner.position = idxToPos[newCornerIdx].split('');
                corner.position = corner.position.map(Number);
            }
            solution = solution + moveToU({face: 'U', position: [0,1]}, {face: faceAfterRotation[corner.face][slotToRotation[getSlot(edge)]], position: corner.position});
        }
    }
    return solution;
}

function seperate(cube, edge, corner) {
    let solution = '';

    const slotToRot = {'GR':'', 'BR':'y ', 'BO':'y2 ', 'GO':"y' "};
    const edgeCol = cube.faces[edge.face][edge.position[0]][edge.position[1]];
    let adjEdge = adjacentEdges[edge.face][`${edge.position[0]},${edge.position[1]}`];
    const adjEdgeCol = cube.faces[adjEdge.face][adjEdge.position[0]][adjEdge.position[1]];
    let rotation = slotToRot[`${edgeCol}${adjEdgeCol}`]
    if (!['', 'y ', 'y2 ', "y' "].includes(rotation)) rotation = slotToRot[`${adjEdgeCol}${edgeCol}`];
    solution = solution + rotation;

    const upperCorner = adjacentCorners[corner.face][`${corner.position[0]},${corner.position[1]}`];
    const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
    const posToIdx = {'00':0, '02':1, '22':2, '20':3};
    const oldCornerIdx = posToIdx[`${upperCorner.position[0]}${upperCorner.position[1]}`];
    let newCornerIdx = (oldCornerIdx + rotToAdd[rotation]) % 4;

    const idxToMove = {0:'U2 ', 1:'U ', 2:'', 3:"U' "};
    solution = solution + idxToMove[newCornerIdx];
    return solution + "R U2 R' "
}

function areConnected(edge, corner) {
    if (edge.face !== 'U') edge = adjacentEdges[edge.face][`${edge.position[0]},${edge.position[1]}`];
    corner = adjacentCorners[corner.face][`${corner.position[0]},${corner.position[1]}`];

    if (Math.abs(corner.position[0] - edge.position[0]) <= 1 && Math.abs(corner.position[1] - edge.position[1]) <= 1)
        return true;
    else
        return false;
}

function getCol(cube, facelet) {
    return cube.faces[facelet.face][facelet.position[0]][facelet.position[1]];
}

function solvePair(cube, edgeFacelet, cornerFacelet, cornerWhiteFacelet) {
    if (getCol(cube, edgeFacelet) !== getCol(cube, cornerFacelet)) edgeFacelet = adjacentEdges[edgeFacelet.face][`${edgeFacelet.position[0]},${edgeFacelet.position[1]}`];
    let solution = '';
    if (cornerWhiteFacelet.face === 'U') {
        if (edgeFacelet.face === 'U') edgeFacelet = adjacentEdges[edgeFacelet.face][`${edgeFacelet.position[0]},${edgeFacelet.position[1]}`];
        
        const colPairs = {
            'RR':'', 'RB':'U ', 'RO':'U2 ', 'RG':"U' ",
            'BR':"U' ", 'BB':'', 'BO':'U ', 'BG':'U2 ',
            'OR':'U2 ', 'OB':"U' ", 'OO':'', 'OG':'U ',
            'GR':'U ', 'GB':'U2 ', 'GO':"U' ", 'GG':''
        };
        const edgeCol = cube.faces[edgeFacelet.face][edgeFacelet.position[0]][edgeFacelet.position[1]];
        const centerCol = cube.faces[edgeFacelet.face][1][1];
        const move = colPairs[`${edgeCol}${centerCol}`];
        solution = solution + move;
        
        const colToRot = {'R':'', 'B':'y ', 'O':'y2 ', 'G':"y' "};
        const rotation = colToRot[edgeCol];
        solution = solution + rotation;
        const rotToCenter = {'':'G', 'y ':'R', 'y2 ':'B', "y' ":'O'};
        const fCol = rotToCenter[rotation];
        const upEdge = adjacentEdges[edgeFacelet.face][`${edgeFacelet.position[0]},${edgeFacelet.position[1]}`];
        const upEdgeCol = cube.faces[upEdge.face][upEdge.position[0]][upEdge.position[1]];

        const moveToAdd = {'':0, 'U ':1, 'U2 ':2, "U' ":3};
        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        const posToIdx = {'00':0, '02':1, '22':2, '20':3};
        const oldCornerPos = posToIdx[`${cornerWhiteFacelet.position[0]}${cornerWhiteFacelet.position[1]}`];
        const newCornerPos = (oldCornerPos + moveToAdd[move] + rotToAdd[rotation]) % 4;
        if (fCol === upEdgeCol) {
            switch(newCornerPos) {
                case 0:
                    solution = solution + "R U R' U R U' R' ";
                    break;
                case 3:
                    solution = solution + "R U2 R' U R U' R' ";
                    break;    
                default:
                    console.log("Something is wrong :(");
                    break;
            }
        } else {
            switch(newCornerPos) {
                case 0:
                    solution = solution + "R' U2 R U' R' U R ";
                    break;
                case 3:
                    solution = solution + "R' U' R U' R' U R ";
                    break;    
                default:
                    console.log("Something is wrong :(");
                    break;
            }
        }
    } else if ((edgeFacelet.face === 'U') === (cornerFacelet.face === 'U')) {
        const slotToRot = {'GR':'', 'BR':'y ', 'BO':'y2 ', 'GO':"y' "};
        const edgeCol = cube.faces[edgeFacelet.face][edgeFacelet.position[0]][edgeFacelet.position[1]];
        let adjEdge = adjacentEdges[edgeFacelet.face][`${edgeFacelet.position[0]},${edgeFacelet.position[1]}`];
        const adjEdgeCol = cube.faces[adjEdge.face][adjEdge.position[0]][adjEdge.position[1]];
        let rotation = slotToRot[`${edgeCol}${adjEdgeCol}`]
        if (!['', 'y ', 'y2 ', "y' "].includes(rotation)) rotation = slotToRot[`${adjEdgeCol}${edgeCol}`];
        solution = solution + rotation;

        if (edgeFacelet.face === 'U') [edgeFacelet, adjEdge] = [adjEdge, edgeFacelet];

        const upperCorner = adjacentCorners[cornerWhiteFacelet.face][`${cornerWhiteFacelet.position[0]},${cornerWhiteFacelet.position[1]}`];
        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        const posToIdx = {'00':0, '02':1, '22':2, '20':3};
        const oldCornerIdx = posToIdx[`${upperCorner.position[0]}${upperCorner.position[1]}`];
        let newCornerIdx = (oldCornerIdx + rotToAdd[rotation]) % 4;
        
        const parralel = {'R':'L', 'B':'F', 'L':'R', 'F':'B'};
        if (parralel[cornerWhiteFacelet.face] === edgeFacelet.face) {
            const idxToMove = {0:'U ', 1:'', 2:"U' ", 3:'U2 '};
            const move = idxToMove[newCornerIdx];
            solution = solution + move;
            
            if (cornerWhiteFacelet.position[0] === 0 && cornerWhiteFacelet.position[1] === 0) solution = solution + "R U R' ";
            else solution = solution + "R U' R' ";

            newCornerIdx = 1;
        }
        
        if (cornerWhiteFacelet.position[0] === 0 && cornerWhiteFacelet.position[1] === 0) {
            const idxToMove = {0:"U' ", 1:'U2 ', 2:'U ', 3:''};
            solution = solution + idxToMove[newCornerIdx];  
            solution = solution + "F' U2 F U2 F' U F ";
        } else {
            const idxToMove = {0:'U ', 1:'', 2:"U' " , 3:'U2 '};
            solution = solution + idxToMove[newCornerIdx];  
            solution = solution + "R U2 R' U2 R U' R' ";
        }
    } else {
        const slotToRot = {'GR':'', 'BR':'y ', 'BO':'y2 ', 'GO':"y' "};
        const edgeCol = cube.faces[edgeFacelet.face][edgeFacelet.position[0]][edgeFacelet.position[1]];
        let adjEdge = adjacentEdges[edgeFacelet.face][`${edgeFacelet.position[0]},${edgeFacelet.position[1]}`];
        const adjEdgeCol = cube.faces[adjEdge.face][adjEdge.position[0]][adjEdge.position[1]];
        let rotation = slotToRot[`${edgeCol}${adjEdgeCol}`]
        if (!['', 'y ', 'y2 ', "y' "].includes(rotation)) rotation = slotToRot[`${adjEdgeCol}${edgeCol}`];
        solution = solution + rotation;

        if (edgeFacelet.face === 'U') [edgeFacelet, adjEdge] = [adjEdge, edgeFacelet];

        const upperCorner = adjacentCorners[cornerWhiteFacelet.face][`${cornerWhiteFacelet.position[0]},${cornerWhiteFacelet.position[1]}`];
        const rotToAdd = {'':0, 'y ':1, 'y2 ':2, "y' ":3};
        const posToIdx = {'00':0, '02':1, '22':2, '20':3};
        const oldCornerIdx = posToIdx[`${upperCorner.position[0]}${upperCorner.position[1]}`];
        let newCornerIdx = (oldCornerIdx + rotToAdd[rotation]) % 4;
        
        const parralel = {'R':'L', 'B':'F', 'L':'R', 'F':'B'};
        if (parralel[cornerWhiteFacelet.face] === edgeFacelet.face) {
            const idxToMove = {0:'U ', 1:'', 2:"U' ", 3:'U2 '};
            const move = idxToMove[newCornerIdx];
            solution = solution + move;
            
            if (cornerWhiteFacelet.position[0] === 0 && cornerWhiteFacelet.position[1] === 0) solution = solution + "R U R' ";
            else solution = solution + "R U' R' ";

            newCornerIdx = 1;
        }
        
        const idxToMove = {0:'U2 ', 1:'U ', 2:'', 3:"U' "};
        solution = solution + idxToMove[newCornerIdx];  
        if (cornerWhiteFacelet.position[0] === 0 && cornerWhiteFacelet.position[1] === 0) solution = solution + "R U R' ";
        else solution = solution + "F' U' F ";
    }
    return solution;
}

export function solveF2l(temp) {
    const cube = temp.clone();
    // return cube.findEdge('G', 'R')

    let f2l1ToU = transformAlg(moveToU(cube.findEdge('G', 'R'), cube.findYellowCorner('G', 'R', 'Y')));
    cube.makeAlg(f2l1ToU);
    if (areConnected(cube.findEdge('G', 'R'), cube.findYellowCorner('G', 'R', 'Y'))) {
        const f2l1Seperate = transformAlg(seperate(cube, cube.findEdge('G', 'R'), cube.findYellowCorner('G', 'R', 'Y')));
        f2l1ToU = f2l1ToU + f2l1Seperate;
        cube.makeAlg(f2l1Seperate);
    }
    const f2l1Solution = transformAlg(solvePair(cube, cube.findEdge('G', 'R'), cube.findNonYellowCorner('G', 'R', 'Y'), cube.findYellowCorner('G', 'R', 'Y')));
    cube.makeAlg(f2l1Solution);
    // return f2l1ToU + f2l1Solution;

    // -----------------------------------

    let f2l2ToU = transformAlg(moveToU(cube.findEdge('B', 'R'), cube.findNonYellowCorner('B', 'R', 'Y')));
    cube.makeAlg(f2l2ToU);
    if (areConnected(cube.findEdge('B', 'R'), cube.findNonYellowCorner('B', 'R', 'Y'))) {
        const f2l2Seperate = transformAlg(seperate(cube, cube.findEdge('B', 'R'), cube.findNonYellowCorner('B', 'R', 'Y')));
        f2l2ToU = f2l2ToU + f2l2Seperate;
        cube.makeAlg(f2l2Seperate);
    }
    const f2l2Solution = transformAlg(solvePair(cube, cube.findEdge('B', 'R'), cube.findNonYellowCorner('B', 'R', 'Y'), cube.findYellowCorner('B', 'R', 'Y')));
    cube.makeAlg(f2l2Solution);
    // return f2l1ToU + f2l1Solution +'\n'+ f2l2ToU + f2l2Solution;

    // -----------------------------------

    let f2l3ToU = transformAlg(moveToU(cube.findEdge('B', 'O'), cube.findNonYellowCorner('B', 'O', 'Y')));
    cube.makeAlg(f2l3ToU);
    if (areConnected(cube.findEdge('B', 'O'), cube.findNonYellowCorner('B', 'O', 'Y'))) {
        const f2l3Seperate = transformAlg(seperate(cube, cube.findEdge('B', 'O'), cube.findNonYellowCorner('B', 'O', 'Y')));
        f2l3ToU = f2l3ToU + f2l3Seperate;
        cube.makeAlg(f2l3Seperate);
    }
    const f2l3Solution = transformAlg(solvePair(cube, cube.findEdge('B', 'O'), cube.findNonYellowCorner('B', 'O', 'Y'), cube.findYellowCorner('B', 'O', 'Y')));
    cube.makeAlg(f2l3Solution);
    // return f2l1ToU + f2l1Solution +'\n'+ f2l2ToU + f2l2Solution +'\n'+ f2l3ToU + f2l3Solution;

    // -----------------------------------

    let f2l4ToU = transformAlg(moveToU(cube.findEdge('G', 'O'), cube.findNonYellowCorner('G', 'O', 'Y')));
    cube.makeAlg(f2l4ToU);
    if (areConnected(cube.findEdge('G', 'O'), cube.findNonYellowCorner('G', 'O', 'Y'))) {
        const f2l4Seperate = transformAlg(seperate(cube, cube.findEdge('G', 'O'), cube.findNonYellowCorner('G', 'O', 'Y')));
        f2l4ToU = f2l4ToU + f2l4Seperate;
        cube.makeAlg(f2l4Seperate);
    }
    const f2l4Solution = transformAlg(solvePair(cube, cube.findEdge('G', 'O'), cube.findNonYellowCorner('G', 'O', 'Y'), cube.findYellowCorner('G', 'O', 'Y')));
    cube.makeAlg(f2l4Solution);

    // -----------------------------------

    return f2l1ToU + f2l1Solution + f2l2ToU + f2l2Solution + f2l3ToU + f2l3Solution + f2l4ToU + f2l4Solution;
}

async function getSolution(cube) {
    let tempCube = cube.clone();
    let cross = await solveCross(tempCube);
    console.log(cross)
    cross = cross.replace(/\s\s+/g, ' ').trim();
    tempCube.makeAlg(cross);
    let f2l = solveF2l(tempCube).replace(/\s\s+/g, ' ').trim();
    tempCube.makeAlg(f2l);
    let ll = await solveLL(tempCube);
    ll = ll.replace(/\s\s+/g, ' ').trim();
    return solution = simplifyAlg(cross + ' ' + f2l + ' ' + ll);
}

// const cube = new RubiksCube();
// cube.makeAlg("B2 U' D' L2 B2 U R2 L' F' B' R' D B2 D B' D' B U' R D'");
// console.log(await getSolution(cube));

