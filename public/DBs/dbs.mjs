export const adjacentEdges = {
    U: { // Up face
      '0,1': { face: 'B', position: [0, 1] },  // Top edge -> Back face top edge
      '1,0': { face: 'L', position: [0, 1] },  // Left edge -> Left face top edge
      '1,2': { face: 'R', position: [0, 1] },  // Right edge -> Right face top edge
      '2,1': { face: 'F', position: [0, 1] },  // Bottom edge -> Front face top edge
    },
    F: { // Front face
      '0,1': { face: 'U', position: [2, 1] },  // Top edge -> Up face bottom edge
      '1,0': { face: 'L', position: [1, 2] },  // Left edge -> Left face right edge
      '1,2': { face: 'R', position: [1, 0] },  // Right edge -> Right face left edge
      '2,1': { face: 'D', position: [0, 1] },  // Bottom edge -> Down face top edge
    },
    R: { // Right face
      '0,1': { face: 'U', position: [1, 2] },  // Top edge -> Up face right edge
      '1,0': { face: 'F', position: [1, 2] },  // Left edge -> Front face right edge
      '1,2': { face: 'B', position: [1, 0] },  // Right edge -> Back face left edge
      '2,1': { face: 'D', position: [1, 2] },  // Bottom edge -> Down face right edge
    },
    B: { // Back face
      '0,1': { face: 'U', position: [0, 1] },  // Top edge -> Up face top edge
      '1,0': { face: 'R', position: [1, 2] },  // Left edge -> Right face right edge
      '1,2': { face: 'L', position: [1, 0] },  // Right edge -> Left face left edge
      '2,1': { face: 'D', position: [2, 1] },  // Bottom edge -> Down face bottom edge
    },
    L: { // Left face
      '0,1': { face: 'U', position: [1, 0] },  // Top edge -> Up face left edge
      '1,0': { face: 'B', position: [1, 2] },  // Left edge -> Back face right edge
      '1,2': { face: 'F', position: [1, 0] },  // Right edge -> Front face left edge
      '2,1': { face: 'D', position: [1, 0] },  // Bottom edge -> Down face left edge
    },
    D: { // Down face
      '0,1': { face: 'F', position: [2, 1] },  // Top edge -> Front face bottom edge
      '1,0': { face: 'L', position: [2, 1] },  // Left edge -> Left face bottom edge
      '1,2': { face: 'R', position: [2, 1] },  // Right edge -> Right face bottom edge
      '2,1': { face: 'B', position: [2, 1] },  // Bottom edge -> Back face bottom edge
    }
};

export const adjacentCorners = {
  U: { // Up face
    '0,0': { face: 'U', position: [0, 0] },
    '0,2': { face: 'U', position: [0, 2] }, 
    '2,0': { face: 'U', position: [2, 0] }, 
    '2,2': { face: 'U', position: [2, 2] }, 
  },
  F: { // Front face
    '0,0': { face: 'U', position: [2, 0] },
    '0,2': { face: 'U', position: [2, 2] }, 
    '2,0': { face: 'D', position: [0, 0] }, 
    '2,2': { face: 'D', position: [0, 2] }, 
  },
  R: { // Right face
    '0,0': { face: 'U', position: [2, 2] }, 
    '0,2': { face: 'U', position: [0, 2] }, 
    '2,0': { face: 'D', position: [0, 2] }, 
    '2,2': { face: 'D', position: [2, 2] }, 
  },
  B: { // Back face
    '0,0': { face: 'U', position: [0, 2] },
    '0,2': { face: 'U', position: [0, 0] },
    '2,0': { face: 'D', position: [2, 2] },
    '2,2': { face: 'D', position: [2, 0] },
  },
  L: { // Left face
    '0,0': { face: 'U', position: [0, 0] }, 
    '0,2': { face: 'U', position: [2, 0] }, 
    '2,0': { face: 'D', position: [2, 0] }, 
    '2,2': { face: 'D', position: [0, 0] }, 
  },
  D: { // Down face
    '0,0': { face: 'D', position: [0, 0] }, 
    '0,2': { face: 'D', position: [0, 2] }, 
    '2,0': { face: 'D', position: [2, 0] }, 
    '2,2': { face: 'D', position: [2, 2] }, 
  }
};

export const faceletsIdx = {
  U: {
    '0,1': 5,
    '1,0': 3,
    '1,2': 7,
    '2,1': 1,
  },
  F: {
    '0,1': 2,
    '1,0': 11,
    '1,2': 9,
    '2,1': 18,
  },
  R: { 
    '0,1': 8,
    '1,0': 10,
    '1,2': 16,
    '2,1': 24,
  },
  B: { 
    '0,1': 6,
    '1,0': 15,
    '1,2': 13,
    '2,1': 22,
  },
  L: { 
    '0,1': 4,
    '1,0': 14,
    '1,2': 12,
    '2,1': 20,
  },
  D: { 
    '0,1': 17,
    '1,0': 19,
    '1,2': 23,
    '2,1': 21,
  }
};

export const edgeLocations = [
  { face: 'U', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] },  // U face edges
  { face: 'F', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] },  // F face edges
  { face: 'R', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] },  // R face edges
  { face: 'B', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] },  // B face edges
  { face: 'L', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] },  // L face edges
  { face: 'D', positions: [[0, 1], [1, 0], [1, 2], [2, 1]] }   // D face edges
];

export const edges = [
  { face1: 'U', pos1: [0, 1], face2: 'B', pos2: [0, 1] },
  { face1: 'U', pos1: [1, 2], face2: 'R', pos2: [0, 1] },
  { face1: 'U', pos1: [2, 1], face2: 'F', pos2: [0, 1] },
  { face1: 'U', pos1: [1, 0], face2: 'L', pos2: [0, 1] },
  { face1: 'D', pos1: [0, 1], face2: 'F', pos2: [2, 1] },
  { face1: 'D', pos1: [1, 2], face2: 'R', pos2: [2, 1] },
  { face1: 'D', pos1: [2, 1], face2: 'B', pos2: [2, 1] },
  { face1: 'D', pos1: [1, 0], face2: 'L', pos2: [2, 1] },
  { face1: 'F', pos1: [1, 2], face2: 'R', pos2: [1, 0] },
  { face1: 'F', pos1: [1, 0], face2: 'L', pos2: [1, 2] },
  { face1: 'B', pos1: [1, 0], face2: 'R', pos2: [1, 2] },
  { face1: 'B', pos1: [1, 2], face2: 'L', pos2: [1, 0] }
];

export const corners = [
  { face1: 'U', pos1: [0, 0], face2: 'L', pos2: [0, 0], face3: 'B', pos3: [0, 2] },
  { face1: 'U', pos1: [0, 2], face2: 'R', pos2: [0, 2], face3: 'B', pos3: [0, 0] },
  { face1: 'U', pos1: [2, 0], face2: 'L', pos2: [0, 2], face3: 'F', pos3: [0, 0] },
  { face1: 'U', pos1: [2, 2], face2: 'R', pos2: [0, 0], face3: 'F', pos3: [0, 2] },
  { face1: 'D', pos1: [0, 0], face2: 'L', pos2: [2, 2], face3: 'F', pos3: [2, 0] },
  { face1: 'D', pos1: [0, 2], face2: 'R', pos2: [2, 0], face3: 'F', pos3: [2, 2] },
  { face1: 'D', pos1: [2, 0], face2: 'L', pos2: [2, 0], face3: 'B', pos3: [2, 2] },
  { face1: 'D', pos1: [2, 2], face2: 'R', pos2: [2, 2], face3: 'B', pos3: [2, 0] }
];