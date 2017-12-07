// solved in the browser since I wasn't by my computer

let input = document.getElementsByTagName("pre")[0].innerHTML.split('\t').map(Number);

let seenConfigurations = [];

while (true) {
  input = redistribute(input);
  let isUnique = true;
  let index = 0;
  seenConfigurations.forEach((configuration, i) => {
    if (arrayEquals(input, configuration)) {
      isUnique = false;
      index = i;
    }
  });
  console.log(input);
  if ( ! isUnique) {
    console.log(seenConfigurations.length - index);
    break;
  }
  seenConfigurations.push(input);
}

function redistribute(array) {  
  const maxIndex = array.indexOf(Math.max(...array));
  let numberToRedistribute = array[maxIndex];
  let arrayCopy = array.slice();
  arrayCopy[maxIndex] = 0;
  let insertIndex = maxIndex;
  while (numberToRedistribute > 0) {
    insertIndex = getNextIndex(insertIndex, array.length);
    arrayCopy[insertIndex]++;
    numberToRedistribute--;
  }
  return arrayCopy;
}

function getNextIndex(index, length) {
  return index === length - 1 ? 0 : index + 1;
}

function arrayEquals(array, otherArray) {
    let firstArray = array.slice();
    let secondArray = otherArray.slice();
    return firstArray.length === secondArray.length && firstArray.reduce((acc, currentValue, currentIndex) => {
        return acc && currentValue === secondArray[currentIndex];
    }, true);
}