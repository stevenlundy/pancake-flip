export function isPancakeBurnt(pancake) {
  return pancake < 0;
}

export function getPancakeSize(pancake) {
  return Math.abs(pancake);
}

export function shuffle(arr) {
  // shuffle an array in place
  for (let i = 1; i < arr.length; i++) {
    let swapPos = Math.floor(Math.random() * (i + 1));
    let tmp = arr[swapPos];
    arr[swapPos] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}
