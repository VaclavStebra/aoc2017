'use strict';

const fs = require('fs');

const INPUT = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const solution = require('.');

console.log(solution.countStepsOnPath(INPUT));
console.log(solution.getMaxStepsOnPath(INPUT));
