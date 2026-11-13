import { test } from "node:test";
import assert from "node:assert/strict";
import { knockOff, knockAllOff, rename, broken, whose, type Item, type Table } from "./table.ts";

function kitchen(): Table {
  return {
    name: "kitchen",
    items: [
      { name: "mug", fragile: true, owner: "Ana" },
      { name: "keys", fragile: false },
      { name: "vase", fragile: true },
      { name: "laptop", fragile: true, owner: "Tudor" },
    ],
  };
}

const names = (t: Table) => t.items.map((i) => i.name);

test("knockOff: removes the item", () => {
  assert.deepEqual(names(knockOff(kitchen(), "vase")), ["mug", "keys", "laptop"]);
});

test("knockOff: new table, new array, original untouched", () => {
  const before = kitchen();
  const after = knockOff(before, "vase");
  assert.notEqual(after, before);
  assert.notEqual(after.items, before.items);
  assert.deepEqual(before, kitchen());
});

// test("knockOff: unknown name keeps the items", () => {
//   const before = kitchen();
//   const after = knockOff(before, "piano");
//   assert.deepEqual(names(after), names(before));
//   assert.notEqual(after.items, before.items);
// });

test("knockOff: throws error on an unexisting item", () => {
  const before = kitchen();
  assert.throws(
      () => knockOff(before, "piano"),
      {
        message: "The item named 'piano' does not exist in the list"
      });
});

test("knockAllOff: one snapshot per push, last item first", () => {
  const snaps = knockAllOff(kitchen());
  assert.deepEqual(snaps.map(names), [["mug", "keys", "vase"], ["mug", "keys"], ["mug"], []]);
});

test("knockAllOff: snapshots don't share anything", () => {
  const original = kitchen();
  const snaps = knockAllOff(original);
  // mutating one snapshot on purpose. the cast is so this still compiles after part 2
  (snaps[0]?.items as Item[]).push({ name: "intruder", fragile: false });
  assert.equal(snaps[1]?.items.length, 2);
  assert.equal(original.items.length, 4);
});

test("knockAllOff: empty table", () => {
  assert.deepEqual(knockAllOff({ name: "empty", items: [] }), []);
});

test("rename: new name in the result", () => {
  assert.deepEqual(names(rename(kitchen(), "mug", "cup")), ["cup", "keys", "vase", "laptop"]);
});

test("rename: the original item keeps its name", () => {
  const before = kitchen();
  const mug = before.items[0];
  rename(before, "mug", "cup");
  assert.equal(mug?.name, "mug");
  assert.deepEqual(before, kitchen());
});

test("rename: the rest of the item stays", () => {
  const cup = rename(kitchen(), "mug", "cup").items[0];
  assert.equal(cup?.fragile, true);
  assert.equal(cup?.owner, "Ana");
});

test("broken: fragile things that are gone", () => {
  const before = kitchen();
  const after = knockOff(knockOff(knockOff(before, "laptop"), "keys"), "mug");
  assert.deepEqual(broken(before, after), ["mug", "laptop"]);
});

test("broken: nothing fell", () => {
  assert.deepEqual(broken(kitchen(), kitchen()), []);
});

test("whose", () => {
  assert.equal(whose({ name: "mug", fragile: true, owner: "Ana" }), "Ana's mug");
  assert.equal(whose({ name: "vase", fragile: true }), "nobody's vase");
});

// Part 2: uncomment after making the types readonly.
// Each marked line must be a compile error.
//
function typeChecks(table: Table) {
  // @ts-expect-error
  table.items.push({ name: "x", fragile: false });
  // @ts-expect-error
  table.items[0].name = "x";
  // @ts-expect-error
  table.name = "x";
  // @ts-expect-error
  table.items.sort();
}
