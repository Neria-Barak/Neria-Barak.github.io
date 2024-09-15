class Cubie {
    constructor(name) {
        this.or = 0;
        this.name = name;
    }
    r() {

    }
}
class Cube {
    constructor() {
        this.edges = [];
        this.corners = []; 
        const cornerNames = ['ulb', 'ubr', 'urf', 'ufl', 'dlf', 'dfr', 'drb', 'dbl'];
        const edgesNames = ['ub', 'ur', 'uf', 'ul', 'fl', 'fr', 'br', 'bl', 'df', 'dr', 'db', 'dl'];
        cornerNames.forEach((name) => {this.corners.push(new Cubie(name))});
        edgesNames.forEach((name) => {this.edges.push(new Cubie(name))});
    }
    U() {
        swapCorners = [0,1,2,3];
        swapEdges = [0,1,2,3];
        swap(swapCorners, this.corners);
        swap(swapEdges, this.edges);
    }
    D() {
        swapCorners = [4,5,6,7];
        swapEdges = [8,9,10,11];
        swap(swapCorners, this.corners);
        swap(swapEdges, this.edges);
    }
    R() {
        swapCorners = [1,6,5,2];
        swapEdges = [1,6,10,5];
        swap(swapCorners, this.corners);
        swap(swapEdges, this.edges);
        swapCorners.forEach((idx) => {this.corners[idx] = this.corners[idx] })
    }
}

const str = "aabbbbbb";

// Extract the first two characters
const firstPart = str.slice(0, 2);

// Extract the rest of the string (from index 2 to the end)
const remainingPart = str.slice(2);

// Reassemble the string with the first two characters moved near the end
const result = remainingPart + firstPart;

console.log(result); // Output: "bbbbbaab"
