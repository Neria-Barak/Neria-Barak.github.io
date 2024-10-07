import { RubiksCube } from "../Solver/cube.mjs";
import { StatisticsManager } from "./StatisticsManager.js";

const n = 100000;

const sm = new StatisticsManager();
async function solveCubes() {
    console.time(`Solving ${n} cubes`);
    
    for (let i = 0; i < n; i++) {
        const cube = new RubiksCube(sm);
        cube.scramble();
        await cube.getSolution();

        // Update percentage
        if (i % 100 === 99) { // Only update every 100 iterations for performance
            document.getElementById("percent").textContent = `${((i+1) / n * 100).toFixed(1)}%`;
            await new Promise(resolve => setTimeout(resolve, 0)); // Yield control to browser for UI update
        }
    }

    console.timeEnd(`Solving ${n} cubes`);
}

await solveCubes();

document.getElementById("avgMoves").textContent = `Average Number of Moves: ${sm.getAvgNumOfMoves()}`;
document.getElementById("avgCrossMoves").textContent = `Average Number of Cross Moves: ${sm.getAvgNumOfCrossMoves()}`;
document.getElementById("avgLLMoves").textContent = `Average Number of LL Moves: ${sm.getAvgNumOfLLMoves()}`;
document.getElementById("LLSkip").textContent = `Chance for LL skip: ${sm.getChanceForLLSkip()}`;
document.getElementById("OllSkip").textContent = `Chance for OLL skip: ${sm.getChanceForOllSkip()}`;
