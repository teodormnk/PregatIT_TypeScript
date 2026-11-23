// The cats. Leave this file alone.

const names = [
  "Miso", "Pixel", "Tuna", "Beans", "Mochi", "Olive", "Ziggy", "Pickle",
  "Noodle", "Biscuit", "Pepper", "Waffle", "Sushi", "Gizmo", "Peanut", "Toast",
  "Mango", "Nacho", "Dumpling", "Cleo", "Figaro", "Bagel", "Truffle", "Yuzu",
];

const quirks = [
  "sits in any box, whatever the size",
  "pushes things off the table while looking at you",
  "runs through the house at 3 a.m.",
  "screams at a full bowl",
  "sleeps on the warm laptop",
  "is afraid of cucumbers",
  "brings you one sock",
  "stares at the wall",
  "drinks only from the tap",
  "chirps at birds through the window",
];

export type Cat = {
  id: number;
  name: string;
  quirk: string;
  naps: number; // hours of sleep per day
};

export const cats: Cat[] = names.flatMap((name, n) =>
  quirks.map((quirk, q) => ({
    id: n * quirks.length + q + 1,
    name: `${name} ${q + 1}`,
    quirk,
    naps: 12 + ((n * 7 + q * 3) % 9),
  })),
);
