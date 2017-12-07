'use strict';

const fs = require('fs');
const assert = require('assert');

const TEST_INPUT = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

const EXPECTED_OUTPUT = 'tknk';

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function getRoot(input) {
    let childrenNodes = new Set();
    const rows = input.split('\n');
    const parsed = rows.map(parseRow);
    parsed.forEach(program => 
        program.children.forEach(child => 
            childrenNodes.add(child)
        )
    );
    return parsed.find(program => ! childrenNodes.has(program.name)).name;
}

function parseRow(row) {
    const regex = /^([a-zA-Z]+) \(([0-9]+)\)( -> ([a-zA-Z, ]+)){0,1}$/g;
    const result = regex.exec(row);
    return {
        name: result[1],
        weight: +result[2],
        children: result.length >= 5 && result[4] ? result[4].split(', ') : []
    };
}

function test() {
    const root = getRoot(TEST_INPUT);
    assert.equal(root, EXPECTED_OUTPUT);
}

test();

const result = getRoot(INPUT);
console.log(result);
