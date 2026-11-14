// 04 - moods

// TODO: the four moods
export type Mood = "sleepy" | "hungry" | "playful" | "grumpy";

// TODO: fed (grams), petted (seconds), ignored, vacuum
export type CatEvent = { kind: "fed"; grams: number}
  | { kind: "petted"; seconds: number}
  | { kind: "ignored"}
  | { kind: "vacuum"};

export function sound(mood: Mood): string {
  switch(mood) {
    case "hungry":
      return "MEOW";
    case "sleepy":
      return "purr";
    case "playful":
      return "chirp";
    case "grumpy":
      return "hiss";
    default:
      throw new Error("Mood '" + mood + "' is not supported! (sound)");
  }
}

export function next(mood: Mood, event: CatEvent): Mood {
  switch(event.kind) {
    case "fed":
      if(event.grams >= 50) {
        return "sleepy" as Mood;
      }
      return "hungry" as Mood;
    case "petted":
      if(mood === "grumpy") {
        return mood;
      }
      if(event.seconds <= 3) {
        return "playful" as Mood;
      }
      return "grumpy" as Mood;
    case "ignored":
      if(mood === "playful") {
        return "grumpy" as Mood;
      }
      return mood;
    case "vacuum":
      return "grumpy" as Mood;
  }
}

export function day(start: Mood, events: CatEvent[]): Mood[] {
  let current: Mood = start; // current state of the feline
  const moods: Mood[] = [];
  for(const event of events) {
    current = next(current, event); // takes the current mood and applies the event,
    moods.push(current); // and then pushes the current mood after the event as occured
  }
  return moods;
}

export function parseMood(input: unknown): Mood | null {
  if(typeof input !== "string") {
    throw new Error("Mood '" + input as Mood + "' is not supported! (parseMood param type check)");
  }
  let inputString: string = input.trim().toLowerCase();
  switch(inputString as Mood) {
    case "hungry":
    case "sleepy":
    case "playful":
    case "grumpy":
      return inputString as Mood;
    default:
      throw new Error("Mood '" + inputString as Mood + "' is not supported! (parseMood)");
  }
}
