// Use ES6 import for cubejs
import CubeJS from 'cubejs';

CubeJS.initSolver();

export const cheatCube = new CubeJS();

// document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//         // Get the solution and display it in the div
//         const solution = cube.solve();
//         const solutionDisplay = document.getElementById('solutionDisplay');
//         solutionDisplay.innerText = solution;
//     }
// });
