import { reorder } from "./data";

test("reorder test", () => {
  expect(reorder([1, 2, 3], 1, 2)).toStrictEqual([1, 3, 2]);
});

test("reorder test", () => {
  expect(reorder([1, 2, 3], 2, 1)).toStrictEqual([1, 3, 2]);
});

test("reorder test", () => {
  expect(reorder([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 1)).toStrictEqual([
    1, 3, 2, 4, 5, 6, 7, 8, 9,
  ]);
});

test("reorder test", () => {
  expect(reorder([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 2)).toStrictEqual([
    1, 3, 2, 4, 5, 6, 7, 8, 9,
  ]);
});

test("reorder test", () => {
  expect(reorder([1, 2, 3, 4, 5, 6, 7, 8, 9], 8, 0)).toStrictEqual([
    9, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
});
