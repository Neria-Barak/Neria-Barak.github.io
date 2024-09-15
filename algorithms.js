import { Vector3 } from 'three';
import { U, D, R, L, F, B } from './moves.js';
import { cubies } from './main.js';
// const fs = require('fs');
// const { parse } = require('csv-parse');
import { cube } from './cheat.js';


function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
function makeMove(move) {
    let type = 1;
    let prime = 0;

    if (move > 11) {
        type = 2;
        move -= 12;
    } else if (move > 5) {
        move -= 6;
        prime = 1;
    }
    for (var i = 0; i < type; i++) {
        switch (move) {
            case 0:
                U(prime);
                break;
            case 1:
                D(prime);
                break;
            case 2:
                R(prime);
                break;
            case 3:
                L(prime);
                break;
            case 4:
                F(prime);
                break;
            case 5:
                B(prime);
                break;     
        }
    }
}

export function scramble() {
    let moves = []
    
    for (var i = 0; i < 24; i++) {
        var move = getRandomInt(0, 6);
        var times = getRandomInt(1, 4);

        if (move === moves[moves.length - 1])
            continue;

        for (var j = 0; j < times; j++) {
            moves.push(move);
        }
    }
    
    moves.forEach((move) => {makeMove(move)});
}

export function reset() {
    cubies.forEach((element) => {
        element.rotation.x = 0;
        element.rotation.y = 0;
        element.rotation.z = 0;
    })
    cube.move(cube.solve());
   
}

export function solve() {
    move(cube.solve());
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        scramble();
    } else if (event.key === 'ArrowDown') {
        reset();
    } else if (event.key === ']') { 
        solveCross()
    } else if (event.key === '[') { 
        solve();
    } 
});

export function isSolved() {
    console.log("here");
    let x = cubies[0].rotation.x;
    let y = cubies[0].rotation.y;
    let z = cubies[0].rotation.z;
    for (var i = 1; i < cubies.length; i++) {
        if ((Math.abs(cubies[i].rotation.x - x) > 0.001) || (Math.abs(cubies[i].rotation.y - y) > 0.001) || (Math.abs(cubies[i].rotation.z - z) > 0.001)) {
            return false;
        }
    }
    console.log("solved!");
    return true;
}

function isCrossed() {
    const cross = [7, 15, 25, 17];
    for (var i = 0; i < cross.length; i++) {
        if (Math.abs(cubies[cross[i]].rotation.x) > 0.001 || Math.abs(cubies[cross[i]].rotation.y) > 0.001 || Math.abs(cubies[cross[i]].rotation.z) > 0.001)
            return false;
    }
    return true;
}

// Solves cross with a brute-force approach using up to 8 moves
export function solveCross() {
    const numMoves = 6;
    var solution = []
    for (var a = 0; a < numMoves; a++) {
        makeMove(a);
        solution.push(a);
        if (isCrossed()) return solution;
        for (var b = 0; b < numMoves; b++) {
            makeMove(b);
            solution.push(b);
            if (isCrossed()) return solution;
            for (var c = 0; c < numMoves; c++) {
                makeMove(c);
                solution.push(c);
                if (isCrossed()) return solution;
                for (var d = 0; d < numMoves; d++) {
                    makeMove(d);
                    solution.push(d);
                    if (isCrossed()) return solution;
                    for (var e = 0; e < numMoves; e++) {
                        makeMove(e);
                        solution.push(e);
                        if (isCrossed()) return solution;
                        for (var f = 0; f < numMoves; f++) {
                            makeMove(f);
                            solution.push(f);
                            if (isCrossed()) return solution;
                            for (var g = 0; g < numMoves; g++) {
                                makeMove(g);
                                solution.push(g);
                                if (isCrossed()) return solution;
                                for (var h = 0; h < numMoves; h++) {
                                    makeMove(h);
                                    solution.push(h);
                                    if (isCrossed()) return solution;
                                    makeMove(getInverseMove(h));
                                    solution.pop()
                                }
                                makeMove(getInverseMove(g));
                                solution.pop()
                            }
                            makeMove(getInverseMove(f));
                            solution.pop()
                        }
                        makeMove(getInverseMove(e));
                        solution.pop()
                    }
                    makeMove(getInverseMove(d));
                    solution.pop()
                }
                makeMove(getInverseMove(c));
                solution.pop()
            }
            makeMove(getInverseMove(b));
            solution.pop()
        }
        makeMove(getInverseMove(a));
        solution.pop()
    }
}


// Helper function to get the inverse of a move
function getInverseMove(move) {
    if (move < 6) {
        return move + 6;
    } else if (move < 12) {
        return move - 6;
    } else {
        return move;
    }
}

async function move(moves) {
    let moveList = moves.split(" ");
    let moveTranslate = {
        'U': 0,
        'D': 1,
        'R': 2,
        'L': 3,
        'F': 4,
        'B': 5,
        'U2': 0 + 12,
        'D2': 1 + 12,
        'R2': 2 + 12,
        'L2': 3 + 12,
        'F2': 4 + 12,
        'B2': 5 + 12,
        'U\'': 0 + 6,
        'D\'': 1 + 6,
        'R\'': 2 + 6,
        'L\'': 3 + 6,
        'F\'': 4 + 6,
        'B\'': 5 + 6,
    };

    moveList.forEach((element) => {
        makeMove(moveTranslate[element]);
    })
}

