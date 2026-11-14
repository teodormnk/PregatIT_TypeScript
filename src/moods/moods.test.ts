import { test } from "node:test";
import assert from "node:assert/strict";
import { sound, next, day, parseMood, type Mood } from "./moods.ts";

test("sound", () => {
  assert.equal(sound("sleepy"), "purr");
  assert.equal(sound("hungry"), "MEOW");
  assert.equal(sound("playful"), "chirp");
  assert.equal(sound("grumpy"), "hiss");
});

test("sound: throw error", () =>{
  assert.throws( () => {sound("scratchy" as Mood)}, { message: "Mood 'scratchy' is not supported! (exhaustive check)"});
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
  // adapted to error throwing techniques
});

test("parseMood: error throw - other string 1", () => {
  assert.throws(() => {parseMood("happy")}, {message: "Mood 'happy' is not supported! (parseMood)"});
});

test("parseMood: error throw - other string 2", () => {
  assert.throws(() => {parseMood(42)}, {message: "Mood '42' is not supported! (parseMood param type check)"});
});

test("parseMood: error throw - null entry", () => {
  assert.throws(() => {parseMood(null)}, {message: "Mood 'null' is not supported! (parseMood param type check)"});
});

test("parseMood: error throw - undefined entry", () => {
  assert.throws(() => {parseMood(undefined)}, {message: "Mood 'undefined' is not supported! (parseMood param type check)"});
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
