import { RubiksCube } from "./cube.mjs";
import { move } from "../src/algorithms.js";

export const cube = new RubiksCube();

document.addEventListener('keydown', async function(event) {
    if (event.key === 'ArrowLeft') {
        move(await cube.getSolution());
    } else if (event.key === 'ArrowRight') {
        let solutionDisplay = document.getElementById('solutionDisplay');
        solutionDisplay.innerText = await cube.getSolution();
    }
});