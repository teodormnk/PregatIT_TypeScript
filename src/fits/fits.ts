// If I fits, I sits
// Tests: node --test        Types: npx tsc --noEmit

/** Dimensions in cm. `label?` means the field may be absent entirely. */
export type Box = {
  readonly width: number;
  readonly depth: number;
  readonly label?: string;
};

export type Cat = {
  readonly name: string;
  /** nose to tail base, cm */
  readonly length: number;
  readonly width: number;
};

/** The result of seating one cat. `box: null` means the cat found nothing. */
export type Seating = {
  readonly cat: Cat;
  readonly box: Box | null;
};

/**
 * Cats are liquid: the box area must be at least 70% of the cat's area,
 * and the box's shorter side at least half the cat's width.
 */
export function fits(cat: Cat, box: Box): boolean {
  throw new Error("fits: not written yet");
}

/** The smallest box (by area) the cat fits in; the first one on a tie; null if none. */
export function bestBox(cat: Cat, boxes: readonly Box[]): Box | null {
  throw new Error("bestBox: not written yet");
}

/**
 * Each cat, in order, takes its best box among those still free.
 * `boxes` must come out exactly as it went in.
 */
export function seat(cats: readonly Cat[], boxes: readonly Box[]): Seating[] {
  throw new Error("seat: not written yet");
}

/** "shoebox (30×20)" or "unlabelled box (30×20)". The × is U+00D7. */
export function describe(box: Box): string {
  throw new Error("describe: not written yet");
}
