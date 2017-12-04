'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = [1, 12, 23, 1024];

const INPUT_02 = [];

const EXPECTED_OUTPUT_01 = [0, 3, 2, 31];
const EXPECTED_OUTPUT_02 = [];

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
    let width = 1;
    while (number > width * width) {
        width += 2;
    }
    
    let candidate = width * width;
    const maxCoord = (width - 1) / 2;

    const xDeltas = [1, 0, -1, 0];
    const yDeltas = [0, -1, 0, 1];
    const xCandidates = [-maxCoord, -maxCoord, maxCoord, maxCoord];
    const yCandidates = [-maxCoord, maxCoord, maxCoord, -maxCoord];

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

function p02(input) {
    return 0;
}

function test01() {
    testManhatanDistance();
    INPUT_01.forEach((input, index) => {
        const distance = p01(input);
        assert.equal(distance, EXPECTED_OUTPUT_01[index]);
    });
}

function test02(input, output) {
    const result = p02(input);
    assert.equal(result, output);
}

test01();
test02(INPUT_02, EXPECTED_OUTPUT_02);

// 371
const result = p01(INPUT);
const result2 = p02(INPUT);
console.log(result, result2);
