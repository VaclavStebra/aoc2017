'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUTS_01 = ['1122', '1111', '1234', '91212129'];
const EXPECTED_OUTPUTS_01 = [3, 4, 0, 9];
const INPUTS_02 = ['1212', '1221', '123425', '123123', '12131415'];
const EXPECTED_OUTPUTS_02 = [6, 0, 4, 12, 4];

const CAPTCHA = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function sumCaptcha(item, distance) {
    const itemArray = item.split('').map(item => +item);
    const filteredSameDigits = itemArray.filter((digit, index) => {
        return digit === itemArray[(index + distance) % itemArray.length];
    });
    return filteredSameDigits.reduce((acc, digit) => {
        return acc + digit;
    }, 0);
}

function test(inputs, outputs, distanceFunction) {
    inputs.forEach((item, index) => {
        const result = sumCaptcha(item, distanceFunction(item.length));
        assert.equal(result, outputs[index], `${item}: ${result} ${outputs[index]}`);
    });
}

test(INPUTS_01, EXPECTED_OUTPUTS_01, () => 1);
test(INPUTS_02, EXPECTED_OUTPUTS_02, length => length / 2);

const result_01 = sumCaptcha(CAPTCHA, 1);
const result_02 = sumCaptcha(CAPTCHA, CAPTCHA.length / 2);
console.log(result_01, result_02);
