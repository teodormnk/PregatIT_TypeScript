import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "./greet.js";

test("greets by name", () => {
  assert.equal(greet("Johny"), "Hello, Johny!");
});

test("greets a stranger when the name is empty", () => {
  assert.equal(greet(""), "Hello, stranger!");
});

test("greets a stranger when there is no name at all", () => {
  assert.equal(greet(), "Hello, stranger!");
});

// Part 2 — uncomment when part 1 is green.
//
// test("ignores spaces around the name", () => {
//   assert.equal(greet("  ana "), "Hello, Ana!");
// });
//
// test("writes the name with one capital letter", () => {
//   assert.equal(greet("MARIO"), "Hello, Mario!");
//   assert.equal(greet("kati"), "Hello, Kati!");
// });
//
// test("a name made only of spaces is no name", () => {
//   assert.equal(greet("   "), "Hello, stranger!");
// });
