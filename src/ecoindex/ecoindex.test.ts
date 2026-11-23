import { test } from "node:test";
import assert from "node:assert/strict";
import { DOM, quantile, ecoIndex, grade, type Grade, type Page } from "./ecoindex.ts";

function close(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 0.01, `got ${actual}, expected ${expected}`);
}
// "The measuring grid needs to have numbers!"
test("quantile: needs to be greater than zero", () => {
  assert.throws(() => quantile(DOM, -7), {message: "Value must be greater than zero!"});
});

test("quantile: given table has 0 elements", () => {
  assert.throws(() => quantile([], 47), {message: "The measuring grid needs to have numbers!"});
});

test("quantile: the lightest value is 0", () => {
  close(quantile(DOM, 0), 0);
});

test("quantile: on a border", () => {
  close(quantile(DOM, 47), 1);
  close(quantile(DOM, 2479), 19);
});

test("quantile: halfway into a bucket", () => {
  close(quantile(DOM, 61), 1.5);
});

test("quantile: bigger than every border", () => {
  close(quantile(DOM, 1_000_000), 20);
});

test("ecoIndex: an empty page scores 100", () => {
  close(ecoIndex({ dom: 0, requests: 0, sizeKb: 0 }), 100);
});

test("ecoIndex: the worst page scores 0", () => {
  close(ecoIndex({ dom: 600_000, requests: 4000, sizeKb: 300_000 }), 0);
});

// 600 elements, 40 requests, 1024 KB is what EcoIndex itself calls a good target
test("ecoIndex: the target page", () => {
  close(ecoIndex({ dom: 600, requests: 40, sizeKb: 1024 }), 60.92);
});

// and this is the median web page in their data
test("ecoIndex: the median page", () => {
  close(ecoIndex({ dom: 693, requests: 78, sizeKb: 2420 }), 43.68);
});

test("grade", () => {
  assert.equal(grade(90), "A");
  assert.equal(grade(79), "B");
  assert.equal(grade(60), "C");
  assert.equal(grade(45), "D");
  assert.equal(grade(30), "E");
  assert.equal(grade(15), "F");
  assert.equal(grade(5), "G");
});

test("grade: negative score", () => {
  assert.throws(() => grade(-3), {message: "The ecoIndex score must be greater than zero!"});
});

// never called, tsc checks it
function typeChecks() {
  // @ts-expect-error H is not a grade
  const g: Grade = "H";

  // @ts-expect-error sizeKb is missing
  const p: Page = { dom: 1, requests: 1 };
}
