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
    return manhatanDistance(portCoords, coords);
}

function getCoords(number) {
    let width = 1;
    while (number > width * width) {
        width += 2;
    }
    const cornerDifference = width - 1;
    
    let candidate = (width * width) - cornerDifference;
    let x = -(cornerDifference / 2);
    let y = -x;

    // bottom row
    if (number >= candidate) {
        return findNumber(number, candidate, x, y, 1, 0);
    }
    candidate -= cornerDifference;
    // left column
    if (number >= candidate) {        
        y = cornerDifference / 2;
        return findNumber(number, candidate, x, y, 0, -1);
    }
    candidate -= cornerDifference;
    // top row
    if (number >= candidate) {
        x = cornerDifference / 2;        
        y = x;
        return findNumber(number, candidate, x, y, -1, 0);
    }
    candidate -= (cornerDifference - 1);
    // right column
    x = cornerDifference / 2;
    y = -(cornerDifference / 2 - 1);
    return findNumber(number, candidate, x, y, 0, 1);
}

function findNumber(number, candidate, x, y, deltaX, deltaY) {
    let i = candidate;
    while (i !== number) {
        x += deltaX;
        y += deltaY;
        i++;
    }
    return {x, y};
}

function manhatanDistance(source, target) {
    return Math.abs(source.x - target.x) + Math.abs(source.y - target.y);
}

function testManhatanDistance() {
    assert.equal(manhatanDistance({x: 0, y: 0}, {x: 0, y: 0}), 0);
    assert.equal(manhatanDistance({x: 2, y: -1}, {x: 0, y: 0}), 3);
    assert.equal(manhatanDistance({x: -1, y: 1}, {x: 2, y: 2}), 4);
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
