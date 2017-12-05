'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT_01 = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`;
const TEST_INPUT_01 = INPUT_01.split('\n');

const INPUT_02 = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`;
const TEST_INPUT_02 = INPUT_02.split('\n');

const EXPECTED_OUTPUT_01 = [true, false, true];
const EXPECTED_OUTPUT_02 = [true, false, true, true, false];

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function countValidPhrases(input, phraseCheck = isValid) {
    return input.split('\n').filter(phraseCheck).length;
}

function isValid(passphrase) {
    const words = passphrase.split(' ');
    const uniqueWords = new Set(words);
    return words.length === uniqueWords.size;
}

function isValid02(passphrase) {
    const words = passphrase.split(' ');
    let isValid = true;
    let uniqueWords = [];

    words.forEach(word => {
        const letters = word.split('').sort();
        let isUnique = true;
        uniqueWords.forEach(uniqueWord => {
            if (arrayEquals(uniqueWord, letters)) {
                isUnique = false;
            }
        });
        if (isUnique) {
            uniqueWords.push(letters)
        } else {
            isValid = false;
        }
    });
    
    return isValid;
}

function arrayEquals(array, otherArray) {
    let firstArray = array.slice().sort();
    let secondArray = otherArray.slice().sort();
    return firstArray.length === secondArray.length && firstArray.reduce((acc, currentValue, currentIndex) => {
        return acc && currentValue === secondArray[currentIndex];
    }, true);
}

function test(testInput, expectedTestOutput, input, output, phraseCheck) {
    testInput.forEach((input, index) => {
        const answer = phraseCheck(input);
        assert.equal(answer, expectedTestOutput[index]);
    });
    const numValid = countValidPhrases(input, phraseCheck);
    assert.equal(numValid, output);
}

function test02(input, output) {
    TEST_INPUT_02.forEach((input, index) => {
        const answer = isValid02(input);
        assert.equal(answer, EXPECTED_OUTPUT_02[index]);
    });
    const numValid = countValidPhrases(INPUT_02, isValid02);
    assert.equal(numValid, 3);
}

test(TEST_INPUT_01, EXPECTED_OUTPUT_01, INPUT_01, 2, isValid);
test(TEST_INPUT_02, EXPECTED_OUTPUT_02, INPUT_02, 3, isValid02);

const result = countValidPhrases(INPUT);
const result2 = countValidPhrases(INPUT, isValid02);
console.log(result, result2);
