'use strict';

const fs = require('fs');
const assert = require('assert');

const TEST_INPUT = [
    '{}', '{{{}}}', '{{},{}}', '{{{},{},{{}}}}', '{<a>,<a>,<a>,<a>}',
    '{{<ab>},{<ab>},{<ab>},{<ab>}}', '{{<!!>},{<!!>},{<!!>},{<!!>}}',
    '{{<a!>},{<a!>},{<a!>},{<ab>}}'];

const EXPECTED_OUTPUT = [1, 6, 5, 16, 1, 9, 9, 3];

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function calculateScore(input) {
    const groups = getGroups(input);
    return scoreGroup(groups);
}

function countGarbage(input) {
    input = input.replace(/!!/g, '');
    let removed = 0;
    let insideGarbage = false;
    for (let i = 0; i < input.length; i++) {
        if (insideGarbage) {
            if (input[i] === '>' && input[i - 1] !== '!') {
                insideGarbage = false;
            } else {
                if (input[i] !== '!' && input[i - 1] !== '!') {
                    removed++;
                }
            }
        } else {
            if (input[i] === '<') {
                insideGarbage = true;
            }
        }
    }
    return removed;
}

function getGarbageIndex(input) {
    const start = input.search(/[^!]</);
    let end = input.search(/[^!]>/);
    if (end === -1) {
        end = input.search(/!!>/)
        if (end !== -1) {
            end++;
        }
    }
    return {
        start: (start !== -1) ? start + 1 : start,
        end: (end !== -1) ? end + 1 : start
    };
}

function cleanGarbage(input, garbageIndex) {
    return input.replace(input.substring(garbageIndex.start, garbageIndex.end + 1), '');
}

function getGroups(input) {
    input = input.replace(/!!/g, '');
    let garbageIndex;
    do {
        garbageIndex = getGarbageIndex(input);
        input = cleanGarbage(input, garbageIndex);
    } while (garbageIndex.start !== -1);
    return input.replace(/[^{}]/g, '');
}

function scoreGroup(group) {
    let score = 0;
    let currentValue = 0;
    for (let i = 0; i < group.length; i++) {
        if (group[i] === '{') {
            currentValue += 1;
        } else if (group[i] === '}') {
            score += currentValue;
            currentValue--;
        }
    }
    return score;
}

function testGetGarbageIndex(input) {
    assert.deepEqual(getGarbageIndex('{<ab>}'), { start: 1, end: 4 });
    assert.deepEqual(getGarbageIndex('{<ab!>>}'), { start: 1, end: 6 });
    assert.deepEqual(getGarbageIndex('{<{},{},{{}}>}'), { start: 1, end: 12 });
    assert.deepEqual(getGarbageIndex('{{<!>},{<!>},{<!>},{<a>}}'), { start: 2, end: 22 });
    assert.deepEqual(getGarbageIndex('{{<a!>},{<a!>},{<a!>},{<ab>}}'), { start: 2, end: 26 });
}

function testCleanGarbage() {
    const result = cleanGarbage('{<ab>}', { start: 1, end: 4 });
    assert.equal(result, '{}');
    assert.equal(cleanGarbage('{{<a!>},{<a!>},{<a!>},{<ab>}}', { start: 2, end: 26 }), '{{}}');
}

function testGetGroups() {
    assert.equal(getGroups('{ab}'), '{}');
    assert.equal(getGroups('{{a}, {b}}'), '{{}{}}');
    assert.equal(getGroups('{{<a!>},{<a!>},{<a!>},{<ab>}}'), '{{}}');
}

function testScoreGroup() {
    assert.equal(scoreGroup('{}'), 1);
    assert.equal(scoreGroup('{},{}'), 2);
    assert.equal(scoreGroup('{{},{}}'), 5);
}

function test() {
    TEST_INPUT.forEach((input, index) => {
        const result = calculateScore(input);
        assert.equal(result, EXPECTED_OUTPUT[index]);
    })
}

function test02() {
    assert.equal(countGarbage('<>'), 0);
    assert.equal(countGarbage('<random characters>'), 17);
    assert.equal(countGarbage('<<<<>'), 3);
    assert.equal(countGarbage('<{!>}>'), 2);
    assert.equal(countGarbage('<!!>'), 0);
    assert.equal(countGarbage('<!!!>>'), 0);
    assert.equal(countGarbage('<{o"i!a,<{i<a>'), 10);
}

testGetGarbageIndex();
testCleanGarbage();
testGetGroups();
testScoreGroup();
test();

test02();

const result = calculateScore(INPUT);
const result02 = countGarbage(INPUT);
console.log(result, result02);
