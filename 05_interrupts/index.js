'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = `0
3
0
1
-3`;

const INPUT_02 = `0`;

const EXPECTED_OUTPUT_01 = 5;
const EXPECTED_OUTPUT_02 = 0;

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function countSteps(input) {
    let interruptTable = input.split('\n').map(Number);
    let index = 0;
    let step = 0;

    while (index >= 0 && index < interruptTable.length) {
        const elem = interruptTable[index];
        interruptTable[index]++;
        index += elem;
        step++;
    }

    return step;
}

function test() {
    const steps = countSteps(INPUT_01);
    assert.equal(steps, EXPECTED_OUTPUT_01);
}

test();

const result = countSteps(INPUT);
console.log(result);
