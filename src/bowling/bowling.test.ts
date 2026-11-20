import assert from "node:assert/strict";
import {test} from "node:test";
import {score} from "./bowling.ts";

// gutter game: 20 rolls of 0 scores 0
// all ones: 20 rolls of 1 scores 20
// one spare: 5, 5, 3 scores 16
// one strike: 10, 3, 4 scores 24
// perfect game: 12 strikes score 300
test("gutter game: 20 rolls of 0 scores 0", () => {
   const rolls = new Array<number>(20).fill(0);
   assert.equal(score(rolls), 0);
});

test("all ones: 20 rolls of 1 scores 20", () => {
    const rolls = new Array<number>(20).fill(1);
    assert.equal(score(rolls), 20);
});

test("one spare: 5, 5 scores 16", () => {
    const rolls: number[] = [5, 5, 3];
    assert.equal(score(rolls), 16);
});

test("one spare: for all variants of the sum of 10 between 2 rolls", () => {
    const rolls: number[] = [6, 4, 7, 3, 8, 2, 9, 1, 1, 9, 2, 8, 3, 7, 4, 6, 5, 5, 0, 0];
    assert.equal(score(rolls), 129);
});

test("one strike: 10, 3, 4 scores 24", () => {
    const rolls: number[] = [10, 3, 4];
    assert.equal(score(rolls), 24)
});

test("perfect game: 12 strikes score 300", () => {
    const rolls: number[] = new Array<number>(12).fill(10);
    assert.equal(score(rolls), 300);

});