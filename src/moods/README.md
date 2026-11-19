# 04 - Moods

A cat has four moods: sleepy, hungry, playful, grumpy. Things happen to it and the mood changes. Pet it for more than 3 seconds and it bites.

Write the two types in `src/moods/moods.ts`:

- `Mood`: a union of the four string literals above. No `enum`, it doesn't compile with our tsconfig, and a union does the same job.
- `CatEvent`: a union of objects, each with a `kind`:
  - `fed`, with `grams`
  - `petted`, with `seconds`
  - `ignored`
  - `vacuum`

Then the functions:

- `sound(mood)` - sleepy: `"purr"`, hungry: `"MEOW"`, playful: `"chirp"`, grumpy: `"hiss"`.
- `next(mood, event)` - the mood after the event:
  - fed: 50 grams or more makes it sleepy, less and it is hungry
  - petted: up to 3 seconds makes it playful, longer makes it grumpy. A grumpy cat stays grumpy.
  - ignored: a playful cat gets grumpy, the others don't care
  - vacuum: grumpy, always
- `day(start, events)` - the mood after each event, in order.
- `parseMood(input)` - `input` is `unknown` (think: it came from a form). Return the mood, or `null` if it isn't one. Ignore case and spaces around it.

```
node --test
npx tsc --noEmit
```

## Before you open the PR

Add a fifth mood, `"confused"`, to `Mood`. `tsc` should now complain inside `sound`. If it doesn't, your `switch` is not exhaustive: look up "exhaustiveness checking never" in the handbook. Remove the fifth mood afterwards.
