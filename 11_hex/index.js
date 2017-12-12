'use strict';

function countStepsOnPath(path) {
  const coords = getCoords(path);
  return getDistance({x: 0, y: 0}, coords);
}

function getCoords(path) {
  const steps = path.split(',');
  let x = 0;
  let y = 0;

  steps.forEach(step => {
    const newCoords = makeStep(step, x, y);

    x = newCoords.x;
    y = newCoords.y;
  });

  return {x, y};
}

function getDistance(start, end) {
  let steps = 0;
  let x = start.x;
  let y = start.y;

  while (x !== end.x || y !== end.y) {
    if (x === end.x) {
      // need to move n / s
      steps++;
      if (y < end.y) {
        y++;
      } else {
        y--;
      }
    } else {
      // need to move ne / se / nw / sw
      steps++;
      if (x < end.x) {
        x += 0.5;
      } else {
        x -= 0.5;
      }
      if (y <= end.y) {
        y += 0.5;
      } else {
        y -= 0.5;
      }
    }
  }

  return steps;
}

function getPathInCoords(path) {
  const steps = path.split(',');
  let coordsOnPath = [];
  let x = 0;
  let y = 0;

  if (path.length  > 0) {
    steps.forEach(step => {
      const newCoords = makeStep(step, x, y);
      x = newCoords.x;
      y = newCoords.y;

      coordsOnPath.push({x, y});
    });
  }

  return coordsOnPath;
}

function makeStep(step, x, y) {
  let newX = x;
  let newY = y;

  switch (step) {
    case 'n':
      newY += 1;
      break;
    case 'ne':
      newX += 0.5;
      newY += 0.5;
      break;
    case 'nw':
      newX -= 0.5;
      newY += 0.5;
      break;
    case 's':
      newY -= 1;
      break;
    case 'se':
      newX += 0.5;
      newY -= 0.5;
      break;
    case 'sw':
      newX -= 0.5;
      newY -= 0.5;
      break;
  }
  return {x: newX, y: newY};
}

function getFurthestDistance(start, pathInCoords) {
  const distances = pathInCoords.map(path => getDistance(start, path));
  return distances.length > 0 ? Math.max(...distances) : 0;
}

function getMaxStepsOnPath(path) {
  const pathInCoords = getPathInCoords(path);
  return getFurthestDistance({x: 0, y: 0}, pathInCoords);
}

module.exports = {
  countStepsOnPath,
  getCoords,
  getDistance,
  getPathInCoords,
  getFurthestDistance,
  getMaxStepsOnPath
};
