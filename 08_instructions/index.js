'use strict';

const fs = require('fs');
const assert = require('assert');

const TEST_INPUT = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

const EXPECTED_OUTPUT = 1;
const EXPECTED_MAX_OUTPUT = 10;

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function execute(input) {
    const instructions = parseInput(input);
    let registers = { 'a': 0 };
    let maxValue = 0;

    instructions.forEach(instruction => {
        if (! (instruction.register in registers)) {
            registers[instruction.register] = 0;
        }
        if (! (instruction.conditionRegister in registers)) {
            registers[instruction.conditionRegister] = 0;
        }
        if (shouldExecuteInstruction(instruction, registers)) {
            registers[instruction.register] += instruction.delta; 
            if (registers[instruction.register] > maxValue) {
                maxValue = registers[instruction.register];
            }
        }
    });

    return {
        finalMaxValue: getMaxValueFromRegisters(registers),
        maxValue: maxValue
    };
}

function parseInput(input) {
    return input.split('\n').map(row => {
        const split = row.split(' ');
        
        return {
            register: split[0],
            delta: split[1] === 'inc' ? +split[2] : -split[2],
            conditionRegister: split[4],
            condition: split[5],
            conditionValue: +split[6]
        };
    });
}

function shouldExecuteInstruction(instruction, registers) {
    switch (instruction.condition) {
        case '>':
            return registers[instruction.conditionRegister] > instruction.conditionValue;
        case '<':
            return registers[instruction.conditionRegister] < instruction.conditionValue;
        case '>=':
            return registers[instruction.conditionRegister] >= instruction.conditionValue;
        case '<=':
            return registers[instruction.conditionRegister] <= instruction.conditionValue;
        case '==':
            return registers[instruction.conditionRegister] == instruction.conditionValue;
        case '!=':        
            return registers[instruction.conditionRegister] != instruction.conditionValue;
    }
}

function getMaxValueFromRegisters(registers) {
    const maxKey = Object.keys(registers).reduce((prevMaxKey, current) => registers[prevMaxKey] >= registers[current] ? prevMaxKey : current);
    return registers[maxKey];
}

function test() {
    const root = execute(TEST_INPUT);
    assert.equal(root.finalMaxValue, EXPECTED_OUTPUT);
    assert.equal(root.maxValue, EXPECTED_MAX_OUTPUT);
}

function testGetMaxValueFromRegisters() {
    const registers = {
        'a': 1,
        'b': 4,
        'c': 6,
        'd': 0
    }

    const result = getMaxValueFromRegisters(registers);
    assert.equal(result, 6);
}

function testParseInput() {
    const input = `b inc -5 if a > 1
a dec -1 if b < 5`;
    
    const result = parseInput(input);
    assert.equal(result.length, 2);
    assert.deepEqual(result[0], { register: 'b', delta: -5, conditionRegister: 'a', condition: '>', conditionValue: 1 });
    assert.deepEqual(result[1], { register: 'a', delta: 1, conditionRegister: 'b', condition: '<', conditionValue: 5 });
}

function testShouldExecuteInstruction() {
    const instruction = {
        register: 'b',
        delta: -5,
        conditionRegister: 'a',
        condition: '>=',
        conditionValue: 0
    }

    const registers = {
        a: 0,
        b: 0
    }

    const result = shouldExecuteInstruction(instruction, registers);
    assert.equal(result, true);
}

function testShouldNotExecuteInstruction() {
    const instruction = {
        register: 'b',
        delta: -5,
        conditionRegister: 'a',
        condition: '>=',
        conditionValue: 1
    }

    const registers = {
        a: 0,
        b: 0
    }

    const result = shouldExecuteInstruction(instruction, registers);
    assert.equal(result, false);
}

test();
testGetMaxValueFromRegisters();
testParseInput();
testShouldExecuteInstruction();
testShouldNotExecuteInstruction();

const result = execute(INPUT);
console.log(result.finalMaxValue, result.maxValue);
