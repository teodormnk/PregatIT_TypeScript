import { test, describe as group } from "node:test";
import assert from "node:assert/strict";
import { fits, bestBox, seat, describe, type Box, type Cat } from "./fits.ts";

const blu: Cat = { name: "Blu", length: 40, width: 20 };
const garfield: Cat = { name: "Garfield", length: 60, width: 30 };
const red: Cat = { name: "Red", length: 25, width: 12 };

const shoebox: Box = { width: 30, depth: 20, label: "shoebox" };
const basket: Box = { width: 40, depth: 40, label: "laundry basket" };
const crate: Box = { width: 50, depth: 60 };
const slot: Box = { width: 5, depth: 200, label: "letterbox" };
const flat: Box = { width: 0, depth: 100 };

group("fits()", () => {
  test("a box of 70% of the cat's area is enough, cats are liquid", () => {
    assert.equal(fits(blu, shoebox), true); // 600 >= 560
    assert.equal(fits(garfield, shoebox), false); // 600 < 1260
  });

  test("the box must also be wide enough for half the cat", () => {
    assert.equal(fits(blu, slot), false); // area ok, 5 cm is not
  });

  test("a box with no width fits nobody", () => {
    assert.equal(fits(red, flat), false);
  });

  test("structural typing: anything with width and depth is a box", () => {
    const sofa = { width: 180, depth: 90, seats: 3 };
    const puddle = { width: 25, depth: 25, wet: true, label: "puddle" };
    assert.equal(fits(garfield, sofa), true);
    assert.equal(fits(red, puddle), true);
  });

  test("structural typing: anything with name, length and width is a cat", () => {
    const lion = { name: "Leo", length: 200, width: 80, roars: true };
    assert.equal(fits(lion, crate), false);
  });
});

group("bestBox()", () => {
  test("the smallest box that fits", () => {
    assert.equal(bestBox(blu, [crate, basket, shoebox]), shoebox);
  });

  test("on equal areas, the first one in the list", () => {
    const a: Box = { width: 40, depth: 20, label: "a" };
    const b: Box = { width: 20, depth: 40, label: "b" };
    assert.equal(bestBox(blu, [b, a]), b);
  });

  test("null when nothing fits", () => {
    assert.equal(bestBox(garfield, [shoebox, slot, flat]), null);
  });

  test("null for no boxes at all", () => {
    assert.equal(bestBox(blu, []), null);
  });
});

group("seat()", () => {
  test("cats take their best box in order, and a taken box is gone", () => {
    const seating = seat([blu, red], [basket, shoebox]);
    assert.equal(seating[0]?.box, shoebox);
    assert.equal(seating[1]?.box, basket); // the shoebox would have been red's best
  });

  test("a cat with nothing left gets null", () => {
    const seating = seat([blu, red, garfield], [shoebox]);
    assert.deepEqual(
      seating.map((s) => s.box?.label ?? null),
      ["shoebox", null, null],
    );
  });

  test("the boxes you were given are not touched", () => {
    const boxes = [basket, shoebox];
    seat([blu, red], boxes);
    assert.deepEqual(boxes, [basket, shoebox]);
  });

  test("no cats, no seating", () => {
    assert.deepEqual(seat([], [shoebox]), []);
  });
});

group("describe()", () => {
  test("uses the label when there is one", () => {
    assert.equal(describe(shoebox), "shoebox (30×20)");
  });

  test("falls back when there is none", () => {
    assert.equal(describe(crate), "unlabelled box (50×60)");
  });
});

// Compile-time tests. This function is never called; tsc checks that every
// line marked @ts-expect-error is in fact an error. Make one compile, and
// `npx tsc --noEmit` fails. static_assert, for shapes.
function compileTimeChecks(): void {
  // @ts-expect-error a thing with only a name is not a Cat
  fits({ name: "Nameless" }, shoebox);

  // @ts-expect-error a box's width cannot be changed
  shoebox.width = 31;

  // @ts-expect-error bestBox may return null; .width is not safe without a check
  bestBox(blu, [shoebox]).width;

  // @ts-expect-error a string is not a width
  fits(blu, { width: "30", depth: 20 });
}
