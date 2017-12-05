'use strict';

const fs = require('fs');
const assert = require('assert');

const TEST_INPUT = `0
3
0
1
-3`;

const EXPECTED_OUTPUT_01 = 5;
const EXPECTED_OUTPUT_02 = 10;

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function countSteps(input, changeFunction = (x) => x + 1) {
    let interruptTable = input.split('\n').map(Number);
    let index = 0;
    let step = 0;

    while (index >= 0 && index < interruptTable.length) {
        const elem = interruptTable[index];
        interruptTable[index] = changeFunction(interruptTable[index]);
        index += elem;
        step++;
    }

    return step;
}

function changeFunction02(x) {
    if (x >= 3) {
        return x - 1;
    }

    return x + 1;
}

function test() {
    const steps = countSteps(TEST_INPUT);
    assert.equal(steps, EXPECTED_OUTPUT_01);
    const steps2 = countSteps(TEST_INPUT, changeFunction02);
    assert.equal(steps2, EXPECTED_OUTPUT_02);
}

test();

const result = countSteps(INPUT);
const result02 = countSteps(INPUT, changeFunction02);
console.log(result, result02);
