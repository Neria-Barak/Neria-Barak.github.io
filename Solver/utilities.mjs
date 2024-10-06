function rotateMove(move, rotation) {
    const rotationMapping = {
        F: { "x'": 'U', "x": 'D', "y'": 'L', "y": 'R', "z'": 'F', "z": 'F', 'x2': 'B', 'y2': 'B' },
        B: { "x'": 'D', "x": 'U', "y'": 'R', "y": 'L', "z'": 'B', "z": 'B', 'x2': 'F', 'y2': 'F' },
        L: { "x'": 'L', "x": 'L', "y'": 'B', "y": 'F', "z'": 'U', "z": 'D', 'x2': 'L', 'y2': 'R' },
        R: { "x'": 'R', "x": 'R', "y'": 'F', "y": 'B', "z'": 'D', "z": 'U', 'x2': 'R', 'y2': 'L' },
        U: { "x'": 'B', "x": 'F', "y'": 'U', "y": 'U', "z'": 'R', "z": 'L', 'x2': 'D', 'y2': 'U' },
        D: { "x'": 'F', "x": 'B', "y'": 'D', "y": 'D', "z'": 'L', "z": 'R', 'x2': 'U', 'y2': 'D' } 
    }


    let newMove = rotationMapping[move[0]][rotation];
    if (move.length > 1) newMove = newMove + move[1];
    return newMove
}

export function transformAlg(alg) {
    alg = alg.trim();
    const moves = alg.split(' ');
    const rotations = ['x','y','z',"x'","y'","z'", "x2", 'y2'];
    if (rotations.includes(moves[moves.length - 1])) moves.splice(moves.length - 1, 1);
    
    for (let i=moves.length-1; i>=0; i--) {
        if (!rotations.includes(moves[i])) continue;
        for (let j = i+1; j<moves.length; j++)
            moves[j] = rotateMove(moves[j], moves[i]);
        moves.splice(i, 1);
    }
    return (moves.join(' ') + ' ');
}

export function simplifyAlg(algorithm) {
    let moves = algorithm.split(' ');

    let result = [];

    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const lastMove = result[result.length - 1];

        const getBaseMove = (m) => m[0];

        if (lastMove && getBaseMove(move) === getBaseMove(lastMove)) {
            let baseMove = getBaseMove(move);

            let newMove = '';
            if (lastMove === baseMove && move === baseMove) {
                newMove = baseMove + '2';
            } else if ((lastMove === baseMove && move === baseMove + '2') || (lastMove === baseMove + '2' && move === baseMove)) {
                newMove = baseMove + "'";
            } else if (lastMove === baseMove && move === baseMove + "'") {
                newMove = '';
            } else if (lastMove === baseMove + "'" && move === baseMove) {
                newMove = '';
            } else if (lastMove === baseMove + '2' && move === baseMove + '2') {
                newMove = '';
            } else if ((lastMove === baseMove + '2' && move === baseMove + "'") || (lastMove === baseMove + "'" && move === baseMove + "2")) {
                newMove = baseMove;
            }

            result.pop();
            if (newMove) result.push(newMove);
        } else {
            result.push(move);
        }
    }
    return result.join(' ');
}