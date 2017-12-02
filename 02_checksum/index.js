'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = `5 1 9 5
7 5 3
2 4 6 8`;

const INPUT_02 = `5 9 2 8
9 4 7 3
3 8 6 5`;

const EXPECTED_OUTPUT_01 = 18;
const EXPECTED_OUTPUT_02 = 9;

const SPREADSHEET = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function checksum(input) {
    const arrayInput = parseInput(input);
    return arrayInput.reduce((acc, row) => {
        return acc + Math.max(...row) - Math.min(...row);
    }, 0);
}

function checksum2(input) {
    const arrayInput = parseInput(input);
    return arrayInput.reduce((acc, row) => {
        row.sort((a, b) => b - a);
        for (let i = 0; i < row.length; i++) {
            for (let j = i + 1; j < row.length; j++) {
                if (row[i] % row[j] === 0) {
                    return acc + row[i] / row[j];
                }
            }
        }
    }, 0);
}

function parseInput(input) {
    return input.split('\n').map(el => el.split(/\s+/).map(i => +i));
}

function test(input, output) {
    const result = checksum(input);
    assert.equal(result, output);
}

function test2(input, output) {
    const result = checksum2(input);
    assert.equal(result, output);
}

test(INPUT_01, EXPECTED_OUTPUT_01);
test2(INPUT_02, EXPECTED_OUTPUT_02);

const result = checksum(SPREADSHEET);
const result2 = checksum2(SPREADSHEET);
console.log(result, result2);
