import assert from "assert";
import methods from "../index.js";
const { forEach } = methods;
let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});
it("Should sum an array", () => {
  let total = 0;
  forEach(numbers, (value) => {
    total += value;
  });
  assert.strictEqual(total, 6);
});

it("beforeEach is ran each time", () => {
  assert.strictEqual(numbers.length, 3);
});
