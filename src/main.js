import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Move } from './moves.js';
import {scramble, solve, isSolved} from './algorithms.js';
import {start, stop, reset} from './timer.js';
import { Queue } from './moveQueue.js';
// import { confetti } from './spectacles.js';
window.scramble = scramble;
window.solve = solve;


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x606060); // A medium grey


// Create controls using OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Define the size of each cube (cubie)
var cubieSize = 1;
var gap = 0; // Gap between cubes
var offset = (cubieSize * 3 + gap * 2) / 2 - cubieSize / 2;

// Colors for each side (mimic Rubik's Cube colors)
var faceColors = [
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffffff, // White
    0xffff00, // Yellow
    0xffa500,  // Orange
    0xff0000 // Red
];

export var cubies = [];

// Create a function to generate a cubie
function createCubie(x, y, z) {
    // Define different materials for each face
    var materials = [
        new THREE.MeshBasicMaterial({ color: faceColors[0] }), // Front
        new THREE.MeshBasicMaterial({ color: faceColors[1] }), // Back
        new THREE.MeshBasicMaterial({ color: faceColors[2] }), // Top
        new THREE.MeshBasicMaterial({ color: faceColors[3] }), // Bottom
        new THREE.MeshBasicMaterial({ color: faceColors[4] }), // Left
        new THREE.MeshBasicMaterial({ color: faceColors[5] })  // Right
    ];

    // Create the geometry
    var geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
    
    // Create a cubie with the material
    var cubie = new THREE.Mesh(geometry, materials);

    // Set its position in the 3D grid
    cubie.position.set(x * (cubieSize + gap) - offset, y * (cubieSize + gap) - offset, z * (cubieSize + gap) - offset);

    cubies.push(cubie);

    // Add the cubie to the scene
    scene.add(cubie);

    // // Create the edges geometry for the outline
    // var edges = new THREE.EdgesGeometry(geometry);

    // // Create a line material with black color for the outline
    // var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    // // Create line segments for the outline
    // var outline = new THREE.LineSegments(edges, lineMaterial);

    // // Position the outline to match the cubie
    // outline.position.copy(cubie.position);

    // // Add the outline to the scene
    // scene.add(outline);
}

// Create a 3x3x3 grid of cubies
for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        for (var z = 0; z < 3; z++) {
            createCubie(x, y, z);
        }
    }
}



// cubies[9].position.set(2,2,2);
// cubies[0].rotation.set(Math.PI, Math.PI, 0);

// Move the camera back so the entire cube is visible
camera.position.set(4, 4, -4);
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = Math.PI / 2;

let moveQueue = new Queue();
let isMoving = false;
let toMove = [];
let angle = 0;
let axis;
export function tryMove(move) {
    if (!isMoving) {
        isMoving = true;
        move.moveCube();
    } else {
        moveQueue.enqueue(move);
    }
}
export function setToMove(arr, vector) {
    toMove = arr;
    axis = vector;
    angle = 0;
}



// Animation Loop
let speed = 0.4;
function animate() {
    requestAnimationFrame(animate);

    if (isMoving) {
      
      
      toMove.forEach((element) => {
        const cube = cubies[element];
        axis.normalize();

        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(axis, speed);
        cube.position.applyQuaternion(quaternion);
        cube.quaternion.multiplyQuaternions(quaternion, cube.quaternion);
      })
      
      angle += speed;
      // if move ended
      if (angle > Math.PI / 2) {
        toMove.forEach(element => {
          // Calculate the new position after rotation
          const x = Math.round(cubies[element].position.x);
          const y = Math.round(cubies[element].position.y);
          const z = Math.round(cubies[element].position.z);
          
          const rotX = Math.round(cubies[element].rotation.x / (Math.PI/2)) * (Math.PI/2);
          const rotY = Math.round(cubies[element].rotation.y / (Math.PI/2)) * (Math.PI/2);
          const rotZ = Math.round(cubies[element].rotation.z / (Math.PI/2)) * (Math.PI/2);
          
          // Update the cubies[element]'s position
          cubies[element].position.set(x, y, z);
          cubies[element].rotation.x = rotX;
          cubies[element].rotation.y = rotY;
          cubies[element].rotation.z = rotZ;
        })
        if (isSolved()) stop();
        if (moveQueue.isEmpty()) isMoving = false;
        else {
            moveQueue.dequeue().moveCube();
            // setToMove(arr, vector);
        }
      }
    }
    
    // Ensure controls are updated if enableDamping or autoRotate are true
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Start the animation loop
animate();


document.addEventListener('DOMContentLoaded', function () {
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    speedSlider.addEventListener('input', function () {
        let input = this.value == 0 ? 0.01 : this.value;
        input = input == 0.5 ? 0.4 : input;
        input = input == 0.7 ? 0.8 : input;
        speed = parseFloat(input);
        speedValue.textContent = `${parseFloat(this.value).toFixed(1)}`;
    });
});

