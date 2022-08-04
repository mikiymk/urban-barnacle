export const range = function* (start = 0, end = Infinity): Generator<number> {
  if (start < end) {
    for (let index = start; index < end; index += 1) {
      yield index;
    }
  } else {
    for (let index = start; index > end; index -= 1) {
      yield index;
    }
  }
};
