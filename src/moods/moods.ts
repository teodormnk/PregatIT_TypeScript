// 04 - moods

// TODO: the four moods
export type Mood = string;

// TODO: fed (grams), petted (seconds), ignored, vacuum
export type CatEvent = { kind: string };

export function sound(mood: Mood): string {
  throw new Error("TODO sound");
}

export function next(mood: Mood, event: CatEvent): Mood {
  throw new Error("TODO next");
}

export function day(start: Mood, events: CatEvent[]): Mood[] {
  throw new Error("TODO day");
}

export function parseMood(input: unknown): Mood | null {
  throw new Error("TODO parseMood");
}
