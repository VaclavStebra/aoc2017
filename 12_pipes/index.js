'use strict';

const fs = require('fs');
const assert = require('assert');

const INPUT = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

function countReachableFrom0(input) {
  const parsedInput = parseInput(input);
  let group = new Set([0]);
  let groupLength;
  do {
    groupLength = group.size;

    const values = group.values();

    for (let value of values) {
      parsedInput[value].forEach(elem => {
        group.add(elem);
      });
    }

  } while (group.size !== groupLength);

  return group.size;
}

function parseInput(input) {
  let parsedInput = {};

  input.split('\n').forEach(row => {
    const split = row.split(' <-> ');

    parsedInput[+split[0]] = split[1].split(', ').map(Number);
  });

  return parsedInput;
}

function countGroups(input) {
  const parsedInput = parseInput(input);
  const notInGroup = new Set(Object.keys(parsedInput).map(Number));
  const groups = [];

  while (notInGroup.size > 0) {
    const elem = [...notInGroup][0];

    let group = new Set([elem]);
    let groupLength;
    do {
      groupLength = group.size;

      for (let value of group.values()) {
        parsedInput[value].forEach(elem => {
          group.add(elem);
          notInGroup.delete(elem);
        });
      }

    } while (group.size !== groupLength);

    notInGroup.delete(elem);
    groups.push(group);
  }

  return groups.length;
}

function test() {
  const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
  assert.equal(countReachableFrom0(input), 6);
  assert.equal(countGroups(input), 2);
}

test();

console.log(countReachableFrom0(INPUT));
console.log(countGroups(INPUT));
