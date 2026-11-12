import { test } from "node:test";
import assert from "node:assert/strict";
import { move, run, distance, farthest, where, type Position } from "./zoomies.ts";

test("move: one step in each direction", () => {
  assert.deepEqual(move([5, 5], "N"), [5, 6]);
  assert.deepEqual(move([5, 5], "S"), [5, 4]);
  assert.deepEqual(move([5, 5], "E"), [6, 5]);
  assert.deepEqual(move([5, 5], "W"), [4, 5]);
});

test("move: throws when out of bounds", () => {
  assert.throws(() => move([9, 9], "N"), { message: "Position indexes must be inside the bounds! (final position)" });
  assert.throws(() => move([-1, 9], "N"), { message: "Position indexes must be inside the bounds! (initial position)" });
});

test("move: several steps", () => {
  assert.deepEqual(move([1, 1], "E", 3), [4, 1]);
});

// test("move: walls stop the cat", () => {
//   assert.deepEqual(move([9, 9], "N"), [9, 9]);
//   assert.deepEqual(move([0, 0], "W", 5), [0, 0]);
//   assert.deepEqual(move([8, 2], "E", 5), [9, 2]);
// });

test("move: does not touch the position it got", () => {
  const p: Position = [1, 1];
  move(p, "N", 2);
  assert.deepEqual(p, [1, 1]);
});

test("run: all positions, start included", () => {
  assert.deepEqual(run([0, 0], ["N", "N", "E"]), [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ]);
});

test("run: no directions, the cat stays where it is", () => {
  assert.deepEqual(run([3, 3], []), [[3, 3]]);
});

test("distance", () => {
  assert.equal(distance([0, 0], [3, 4]), 7);
  assert.equal(distance([3, 4], [0, 0]), 7);
  assert.equal(distance([2, 2], [2, 2]), 0);
});

test("farthest: the point farthest from the start", () => {
  assert.deepEqual(farthest([5, 5], ["N", "N", "S", "S", "S"]), [5, 7]);
});

test("farthest: first one on a tie", () => {
  assert.deepEqual(farthest([5, 5], ["N", "S", "S"]), [5, 6]);
});

test("farthest: no run, it is the start", () => {
  assert.deepEqual(farthest([5, 5], []), [5, 5]);
});

test("where", () => {
  assert.equal(where([3, 4], "Miau"), "Miau is at (3, 4)");
  assert.equal(where([3, 4]), "the cat is at (3, 4)");
});

// Not called. tsc checks that each marked line is an error.
function typeChecks() {
  // @ts-expect-error a position is exactly two numbers
  move([1, 2, 3], "N");
  // @ts-expect-error "up" is not a direction
  move([1, 2], "up");
  // @ts-expect-error steps is a number
  move([1, 2], "N", "3");
  // @ts-expect-error distance returns a number, not a string
  const d: string = distance([0, 0], [1, 1]);
}
