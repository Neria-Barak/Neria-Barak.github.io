import { RubiksCube } from "./cube.mjs";
import { solveCross } from "./cross.mjs";
import { solveLL } from "./lastLayer.mjs";
import { solveF2l } from "./f2l.mjs";
import { move } from "../src/algorithms.js";
import { simplifyAlg } from "./utilities.mjs";

export const cube = new RubiksCube();

document.addEventListener('keydown', async function(event) {
    if (event.key === 'ArrowLeft') {
        console.time('Solving');
        let tempCube = cube.clone();
        let cross = await solveCross(tempCube);
        cross = cross.replace(/\s\s+/g, ' ').trim();
        tempCube.makeAlg(cross);
        let f2l = solveF2l(tempCube).replace(/\s\s+/g, ' ').trim();
        tempCube.makeAlg(f2l);
        let ll = await solveLL(tempCube);
        ll = ll.replace(/\s\s+/g, ' ').trim();
        const solution = simplifyAlg(cross + ' ' + f2l + ' ' + ll);
        console.timeEnd('Solving');
        move(solution);
    } else if (event.key === 'ArrowRight') {
        let tempCube = cube.clone();
        let cross = await solveCross(tempCube);
        cross = cross.replace(/\s\s+/g, ' ').trim();
        tempCube.makeAlg(cross);
        let f2l = solveF2l(tempCube).replace(/\s\s+/g, ' ').trim();
        tempCube.makeAlg(f2l);
        let ll = await solveLL(tempCube);
        ll = ll.replace(/\s\s+/g, ' ').trim();
        let solutionDisplay = document.getElementById('solutionDisplay');
        solutionDisplay.innerText = simplifyAlg(cross + ' ' + f2l + ' ' + ll);
    }
});