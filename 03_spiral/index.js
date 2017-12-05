'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = [1, 12, 23, 1024];

const EXPECTED_OUTPUT_01 = [0, 3, 2, 31];

const INPUT = + fs.readFileSync(__dirname + '/input.txt', 'utf8');

const portCoords = {
    x: 0,
    y: 0
};

function p01(input) {
    const coords = getCoords(input);
    return manhattanDistance(portCoords, coords);
}

function getCoords(number) {
    if (number === 1) {
        return {x: 0, y: 0};
    }

    const width = getWidth(number);    
    const maxCoord = (width - 1) / 2;
    
    const xDeltas = [1, 0, -1, 0];
    const yDeltas = [0, -1, 0, 1];
    const xCandidates = [-maxCoord, -maxCoord, maxCoord, maxCoord];
    const yCandidates = [-maxCoord, maxCoord, maxCoord, -maxCoord];
    
    let candidate = width * width;
    let result = -1;

    while (result === -1) {
        let x = xCandidates.shift();
        let y = yCandidates.shift();
        let deltaX = xDeltas.shift();
        let deltaY = yDeltas.shift();
        candidate -= (width - 1);

        result = findNumber(number, candidate, x, y, deltaX, deltaY);
    }

    return result;
}

function getWidth(number) {
    const sqrtFromNumber = Math.floor(Math.sqrt(number));
    return sqrtFromNumber % 2 === 0 ? sqrtFromNumber + 1 : sqrtFromNumber + 2;
}

function findNumber(number, candidate, x, y, deltaX, deltaY) {
    if (number < candidate) {
        return -1;
    }
    let i = candidate;
    while (i !== number) {
        x += deltaX;
        y += deltaY;
        i++;
    }
    return {x, y};
}

function manhattanDistance(source, target) {
    return Math.abs(source.x - target.x) + Math.abs(source.y - target.y);
}

function testManhatanDistance() {
    assert.equal(manhattanDistance({x: 0, y: 0}, {x: 0, y: 0}), 0);
    assert.equal(manhattanDistance({x: 2, y: -1}, {x: 0, y: 0}), 3);
    assert.equal(manhattanDistance({x: -1, y: 1}, {x: 2, y: 2}), 4);
}


function test01() {
    testManhatanDistance();
    INPUT_01.forEach((input, index) => {
        const distance = p01(input);
        assert.equal(distance, EXPECTED_OUTPUT_01[index]);
    });
}

test01();

// crystal ball told me this number
const matrixSize = 11;

function p02(input) {
    let matrix = prepareMatrix();
    let number = 1;

    const centerX = (matrixSize - 1) / 2;
    const centerY = centerX;

    let width = 1;
    let x = centerX;
    let y = centerY;

    while (number <= input) {
        matrix[y][x] = number;
        // next coords
        const nextCoords = getNextCoords(x, y, width, centerX, centerY);  
        x = nextCoords.x;
        y = nextCoords.y;
        
        number = sumNeighbors(matrix, x, y);        
        if (width === 1) {
            width += 2;
            continue;
        }

        // bottom right corner of square
        if (isBottomRightCorner(nextCoords.x, nextCoords.y, centerX, centerY, (width - 1) / 2)) {
            width += 2;
        }   
   
    }
    return number;
}

function prepareMatrix() {
    let matrix = new Array(matrixSize);
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = new Array(matrixSize);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function getNextCoords(x, y, width, centerX, centerY) {
    const radius = (width - 1) / 2;

    if (width === 1) {
        return {
            x: x + 1,
            y
        }
    }

    // top right corner
    if (isTopRightCorner(x, y, centerX, centerY, radius)) {
        return {
            x: x - 1,
            y
        };
    }

    // top left corner
    if (isTopLeftCorner(x, y, centerX, centerY, radius)) {
        return {
            x,
            y: y + 1
        };
    }

    // bottom left corner or bottom right corner
    if (isBottomLeftCorner(x, y, centerX, centerY, radius) || isBottomRightCorner(x, y, centerX, centerY, radius)) {
        return {
            x: x + 1,
            y
        };
    }

    // right column
    if (isRightColumn(x, centerX, radius)) {
        return {
            x,
            y: y - 1
        }
    }

    // top row
    if (isTopRow(y, centerY, radius)) {
        return {
            x: x - 1,
            y
        }
    }

    // left column
    if (isLeftColumn(x, centerX, radius)) {
        return {
            x,
            y: y + 1
        }
    }

    // bottom row
    if (isBottomRow(y, centerY, radius)) {
        return {
            x: x + 1,
            y
        }
    }

    // this is weird but for some reason needed
    return {
        x: x + 1,
        y
    };
}

function isTopRightCorner(x, y, centerX, centerY, radius) {
    return x === centerX + radius && y === centerY - radius;
}

function isTopLeftCorner(x, y, centerX, centerY, radius) {
    return x === centerX - radius && y === centerY - radius;
}

function isBottomLeftCorner(x, y, centerX, centerY, radius) {
    return x === centerX - radius && y === centerY + radius;
}

function isBottomRightCorner(x, y, centerX, centerY, radius) {
    return x === centerX + radius && y === centerY + radius;
}

function isRightColumn(x, centerX, radius) {
    return x === centerX + radius;
}

function isTopRow(y, centerY, radius) {
    return y === centerY - radius;
}

function isLeftColumn(x, centerX, radius) {
    return x === centerX - radius;
}

function isBottomRow(y, centerY, radius) {
    return y === centerY + radius;
}


function sumNeighbors(matrix, x, y) {
    let sum = 0;
    sum += matrix[y-1][x-1];
    sum += matrix[y][x-1];
    sum += matrix[y+1][x-1];

    
    sum += matrix[y-1][x];
    sum += matrix[y+1][x];
    
    sum += matrix[y-1][x+1];
    sum += matrix[y][x+1];
    sum += matrix[y+1][x+1];
    return sum;
}

// 371
const result = p01(INPUT);
const result2 = p02(INPUT);
console.log(result, result2);
