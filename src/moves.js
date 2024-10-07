import * as THREE from 'three';
import { tryMove, setToMove, cubies } from './main.js';
import { stop } from './timer.js';
import { isSolved } from './algorithms.js';
import { cheatCube } from './cheat.js';
import { cube } from '../Solver/main.js' 


export class Move {
    constructor(edges, corners, center, axis, prime, type) {
		this.edges = prime ? edges.reverse() : edges;
        this.corners = prime ? corners.reverse() : corners;
        this.center = center;
        this.axis = prime ? axis.multiplyScalar(-1) : axis;
        this.isPrime = prime;
        this.str = prime ? type + '\'' : type;
	}
    moveCube() {
        swap(this.edges);
        swap(this.corners);
        setToMove(this.edges.concat(this.corners).concat([this.center]), this.axis); 
        // startMoving([edges.concat(corners).concat([center]), axis]);
        // if (isSolved())
        //     stop();
        cheatCube.move(this.str);
        cube.makeMove(this.str);
    }
}
export class Rotation {
    constructor(swap1, swap2, swap3, swap4, swap5, swap6, axis, prime, type) {
        this.axis = prime ? axis.multiplyScalar(-1) : axis;
        this.isPrime = prime;
        this.str = prime ? type + '\'' : type;
        this.swap1 = prime ? swap1.reverse() : swap1;
        this.swap2 = prime ? swap2.reverse() : swap2;
        this.swap3 = prime ? swap3.reverse() : swap3;
        this.swap4 = prime ? swap4.reverse() : swap4;
        this.swap5 = prime ? swap5.reverse() : swap5;
        this.swap6 = prime ? swap6.reverse() : swap6;
	}

    moveCube() {
        swap(this.swap1);
        swap(this.swap2);
        swap(this.swap3);
        swap(this.swap4);
        swap(this.swap5);
        swap(this.swap6);

        let toMove = [];
        for (let i = 0; i < 27; i++) toMove.push(i);
        setToMove(toMove, this.axis);
        cube.makeMove(this.str);
    }
}

function swap(idx) {
    // Simple reference swap without cloning
    var temp = cubies[idx[0]];
    cubies[idx[0]] = cubies[idx[1]];
    cubies[idx[1]] = cubies[idx[2]];
    cubies[idx[2]] = cubies[idx[3]];
    cubies[idx[3]] = temp;
}

export function D(prime) {
    tryMove(new Move([1, 9, 19, 11], [0, 18, 20, 2], 10, new THREE.Vector3(0, 1, 0), prime, "D"));
}
export function U(prime) {
    tryMove(new Move([7, 17, 25, 15], [8, 26, 24, 6], 16, new THREE.Vector3(0, -1, 0), prime, "U"));
}
export function R(prime) {
    tryMove(new Move([3, 15, 21, 9], [0, 6, 24, 18], 12, new THREE.Vector3(0, 0, 1), prime, "R"));
}
export function L(prime) {
    tryMove(new Move([5, 11, 23, 17], [2, 20, 26, 8], 14, new THREE.Vector3(0, 0, -1), prime, "L"));
}
export function F(prime) {
    tryMove(new Move([19, 21, 25, 23], [18, 24, 26, 20], 22, new THREE.Vector3(-1, 0, 0), prime, "F"));
}
export function B(prime) {
    tryMove(new Move([7, 3, 1, 5], [6, 0, 2, 8], 4, new THREE.Vector3(1, 0, 0), prime, "B"));
}
export function M(prime) {
    tryMove(new Move([16, 4, 10, 22], [7, 1, 19, 25], 13, new THREE.Vector3(0, 0, -1), prime, "M"));
}
export function S(prime) {
    tryMove(new Move([16, 14, 10, 12], [17, 11, 9, 15], 13, new THREE.Vector3(-1, 0, 0), prime, "S"));
}
export function E(prime) {
    tryMove(new Move([5, 3, 21, 23], [14, 4, 12, 22], 13, new THREE.Vector3(0, 1, 0), prime, "E"));
}
export function X(prime) {
    tryMove(new Rotation([22, 10, 4, 16], [25, 19, 1, 7], [17, 23, 11, 5], [8, 26, 20, 2], [3, 15, 21, 9], [0, 6, 24, 18], new THREE.Vector3(0, 0, 1), prime, "x"));
}
export function Y(prime) {
    tryMove(new Rotation([23, 21, 3, 5], [22, 12, 4, 14], [7, 17, 25, 15], [8, 26, 24, 6], [11, 19, 9, 1], [2, 20, 18, 0], new THREE.Vector3(0, -1, 0), prime, "y"));
}
export function Z(prime) {
    tryMove(new Rotation([16, 14, 10, 12], [17, 11, 9, 15], [19, 21, 25, 23], [18, 24, 26, 20], [5, 1, 3, 7], [8, 2, 0, 6], new THREE.Vector3(-1, 0, 0), prime, "z"));
}

document.addEventListener('keyup', function(event) {
    if (event.key === 's') {
        D(0);
    } else if (event.key == 'j') {
        U(0)
    } else if (event.key == 'i') {
        R(0);
    } else if (event.key == 'd') {
        L(0);
    } else if (event.key == 'h') {
        F(0);
    } else if (event.key == 'w') {
        B(0);
    } else if(event.key == '6') {
        M(0);
    } else if(event.key == '0') {
        S(0);
    } else if(event.key == '2') {
        E(0);
    } else if (event.key == 'r') {
        X(0);
    } else if (event.key == ';') {
        Y(0);
    } else if (event.key == 'p') {
        Z(0);
    } else if (event.key == 'l') {
        D(1);
    } else if (event.key == 'f') {
        U(1);
    } else if (event.key == 'k') {
        R(1);
    } else if (event.key == 'e') {
        L(1);
    } else if (event.key == 'g') {
        F(1);
    } else if (event.key == 'o') {
        B(1);
    } else if (event.key == '>' || event.key == 'x') {
        M(1);
    } else if (event.key == '1') {
        S(1);
    } else if (event.key == '9') {
        E(1);
    } else if (event.key == 'v') {
        X(1);
    } else if (event.key == 'a') {
        Y(1);
    } else if (event.key == 'q') {
        Z(1);
    }
});


