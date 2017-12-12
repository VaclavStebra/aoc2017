'use strict';

const assert = require('chai').assert;

const solution = require('.');

describe('getCoords', function () {
  it('returns valid coords for one step', function () {
    assert.deepEqual(solution.getCoords('ne'), {x: 0.5, y: 0.5});
    assert.deepEqual(solution.getCoords('nw'), {x: -0.5, y: 0.5});
    assert.deepEqual(solution.getCoords('n'), {x: 0, y: 1});
    assert.deepEqual(solution.getCoords('se'), {x: 0.5, y: -0.5});
    assert.deepEqual(solution.getCoords('sw'), {x: -0.5, y: -0.5});
    assert.deepEqual(solution.getCoords('s'), {x: 0, y: -1});
  });

  it('returns valid coords for two steps', function () {
    assert.deepEqual(solution.getCoords('ne,ne'), {x: 1, y: 1});
    assert.deepEqual(solution.getCoords('n,n'), {x: 0, y: 2});
    assert.deepEqual(solution.getCoords('sw,s'), {x: -0.5, y: -1.5});
  });
});

describe('getDistance', function () {
  it('returns 0 for same coords', function () {
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 0, y: 0}), 0);
  });

  it('returns 1 for neighbors', function () {
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: -0.5, y: 0.5}), 1, 'nw');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 0, y: 1}), 1, 'n');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 0.5, y: 0.5}), 1, 'ne');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: -0.5, y: -0.5}), 1, 'sw');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 0, y: -1}), 1, 's');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 0.5, y: -0.5}), 1, 'se');
  });

  it('returns distance for longer paths', function () {
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 1.5, y: 1.5}), 3, 'ne,ne,ne');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: 1, y: -1}), 2, 'ne,ne,s,s');
    assert.equal(solution.getDistance({x: 0, y: 0}, {x: -0.5, y: -2.5}), 3, 'se,sw,se,sw,sw');
  });
});

describe('countStepsOnPath', function () {
  it('calculates number of steps', function () {
    assert.equal(solution.countStepsOnPath('ne,ne,ne'), 3);
    assert.equal(solution.countStepsOnPath('ne,ne,sw,sw'), 0);
    assert.equal(solution.countStepsOnPath('ne,ne,s,s'), 2);
    assert.equal(solution.countStepsOnPath('se,sw,se,sw,sw'), 3);
  });
});

describe('getPathInCoords', function () {
  it('returns empty array for no path', function () {
    assert.deepEqual(solution.getPathInCoords(''), []);
  });

  it('returns one element array for neighbors', function () {
    assert.deepEqual(solution.getPathInCoords('ne'), [{x: 0.5, y: 0.5}]);
  });

  it('returns two element array for two neighbors', function () {
    assert.deepEqual(solution.getPathInCoords('ne,ne'), [{x: 0.5, y: 0.5}, {x: 1, y: 1}]);
    assert.deepEqual(solution.getPathInCoords('ne,n'), [{x: 0.5, y: 0.5}, {x: 0.5, y: 1.5}]);
    assert.deepEqual(solution.getPathInCoords('nw,se'), [{x: -0.5, y: 0.5}, {x: 0, y: 0}]);
    assert.deepEqual(solution.getPathInCoords('ne,ne,sw,s'), [{x: 0.5, y: 0.5}, {x: 1, y: 1}, {x: 0.5, y: 0.5}, {x: 0.5, y: -0.5}]);
  });
});

describe('getFurthestDistance', function () {
  it('returns 0 for empty path', function () {
    assert.equal(solution.getFurthestDistance({x: 0, y: 0}, []), 0);
  });

  it('returns 1 for on elem neighbor path', function () {
    assert.equal(solution.getFurthestDistance({x: 0, y: 0}, [{x: 0.5, y: 0.5}]), 1);
  });

  it('returns distance for path', function () {
    assert.equal(solution.getFurthestDistance({x: 0, y: 0}, [{x: 0.5, y: 0.5}, {x: 1, y: 1}, {x: 0.5, y: 0.5}, {x: 0.5, y: -0.5}]), 2);
  });
});

describe('getMaxStepsOnPath', function () {
  it('returns max distance on path', function () {
    assert.equal(solution.getMaxStepsOnPath('ne'), 1);
    assert.equal(solution.getMaxStepsOnPath('ne,ne,sw,s'), 2);
  });
});
