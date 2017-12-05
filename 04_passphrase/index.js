'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`;
const TEST_INPUT_01 = ['aa bb cc dd ee', 'aa bb cc dd aa', 'aa bb cc dd aaa'];
const INPUT_02 = [];

const EXPECTED_OUTPUT_01 = [true, false, true];
const EXPECTED_OUTPUT_02 = [];

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function p01(input) {
    return input.split('\n').filter(isValid).length;
}

function p02(input) {
    return 0;
}

function isValid(passphrase) {
    const words = passphrase.split(' ');
    const uniqueWords = new Set(words);
    return words.length === uniqueWords.size;
}

function test01() {
    TEST_INPUT_01.forEach((input, index) => {
        const answer = isValid(input);
        assert.equal(answer, EXPECTED_OUTPUT_01[index]);
    });
    const numValid = p01(INPUT_01);
    assert.equal(numValid, 2);
}

function test02(input, output) {
    const result = p02(input);
    assert.equal(result, output);
}

test01();
test02(INPUT_02, EXPECTED_OUTPUT_02);

const result = p01(INPUT);
const result2 = p02(INPUT);
console.log(result, result2);
