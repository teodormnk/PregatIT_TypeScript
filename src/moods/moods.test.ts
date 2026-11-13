import { test } from "node:test";
import assert from "node:assert/strict";
import { sound, next, day, parseMood } from "./moods.ts";

test("sound", () => {
  assert.equal(sound("sleepy"), "purr");
  assert.equal(sound("hungry"), "MEOW");
  assert.equal(sound("playful"), "chirp");
  assert.equal(sound("grumpy"), "hiss");
});

test("fed", () => {
  assert.equal(next("hungry", { kind: "fed", grams: 80 }), "sleepy");
  assert.equal(next("hungry", { kind: "fed", grams: 50 }), "sleepy");
  assert.equal(next("playful", { kind: "fed", grams: 20 }), "hungry");
});

test("petted", () => {
  assert.equal(next("sleepy", { kind: "petted", seconds: 2 }), "playful");
  assert.equal(next("sleepy", { kind: "petted", seconds: 3 }), "playful");
  assert.equal(next("sleepy", { kind: "petted", seconds: 4 }), "grumpy");
});

test("petting a grumpy cat does not help", () => {
  assert.equal(next("grumpy", { kind: "petted", seconds: 1 }), "grumpy");
});

test("ignored", () => {
  assert.equal(next("playful", { kind: "ignored" }), "grumpy");
  assert.equal(next("sleepy", { kind: "ignored" }), "sleepy");
  assert.equal(next("hungry", { kind: "ignored" }), "hungry");
});

test("vacuum", () => {
  assert.equal(next("sleepy", { kind: "vacuum" }), "grumpy");
  assert.equal(next("playful", { kind: "vacuum" }), "grumpy");
});

test("day", () => {
  const moods = day("hungry", [
    { kind: "fed", grams: 80 },
    { kind: "petted", seconds: 2 },
    { kind: "ignored" },
    { kind: "fed", grams: 60 },
  ]);
  assert.deepEqual(moods, ["sleepy", "playful", "grumpy", "sleepy"]);
});

test("day: nothing happened", () => {
  assert.deepEqual(day("sleepy", []), []);
});

test("parseMood", () => {
  assert.equal(parseMood("grumpy"), "grumpy");
  assert.equal(parseMood("  Sleepy "), "sleepy");
  assert.equal(parseMood("happy"), null);
  assert.equal(parseMood(42), null);
  assert.equal(parseMood(null), null);
  assert.equal(parseMood(undefined), null);
});

// Not called. tsc checks that each marked line is an error.
function typeChecks() {
  // @ts-expect-error not a mood
  sound("happy");
  // @ts-expect-error fed needs grams
  next("hungry", { kind: "fed" });
  // @ts-expect-error no such event
  next("hungry", { kind: "bath" });
  // @ts-expect-error ignored has no seconds
  next("hungry", { kind: "ignored", seconds: 2 });
  // @ts-expect-error parseMood can return null
  const m: string = parseMood("x");
}
