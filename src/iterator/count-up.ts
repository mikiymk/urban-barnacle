/**
 * *provide* number increments
 * @param start counting first value
 * @returns new iterator
 */
export function countUp(start: number): Generator<number>; 
export function* countUp(start = 0): Generator<number> {
  while (true) {
    yield start++;
  }
}
