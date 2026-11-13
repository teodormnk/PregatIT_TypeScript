# 02 - Zoomies

3am. The cat does laps around the room. The room is a 10x10 grid and a position is a tuple `[x, y]`, both between 0 and 9.

Fill in `src/zoomies/zoomies.ts`. The functions have no types yet. Adding them is part of the exercise, and `tsc` stays red until you do.

- `move(pos, dir, steps = 1)` - position after moving. N is y+1, S is y-1, E is x+1, W is x-1. Walls stop the cat, so clamp to 0..9.
- `run(start, dirs)` - every position of the run, one step per direction, start included.
- `distance(a, b)` - |dx| + |dy|.
- `farthest(start, dirs)` - the position of the run that is farthest from start. First one on a tie.
- `where(pos, name?)` - `"Miau is at (3, 4)"`, or `"the cat is at (3, 4)"` when there is no name.

Don't modify the arrays you receive, return new ones.

```
node --test
npx tsc --noEmit
```

Both green, then open a PR named `quirk-02`. About an hour.

Things worth knowing before you start:
- `[number, number]` is a tuple: exactly two numbers. `number[]` is any length. The tests check that you used the right one.
- A parameter with a default value is already optional, you don't write `?` on it.
