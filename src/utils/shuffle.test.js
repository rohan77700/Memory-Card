import shuffle from "./shuffle";

test("shuffles array without losing elements", () => {
  const original = [1, 2, 3, 4];
  const shuffled = shuffle(original);

  expect(shuffled).toHaveLength(original.length);
  expect(shuffled.sort()).toEqual(original.sort());
});