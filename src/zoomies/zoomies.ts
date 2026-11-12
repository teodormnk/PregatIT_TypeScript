// 02 - zoomies

export type Position = [number, number]; // [x, y]
export type Dir = "N" | "E" | "S" | "W";

export const ROOM = 10; // 10x10, coordinates 0..9

// TODO: type the parameters and the return values. tsc complains until you do.

export function move(pos: Position, dir: Dir, steps = 1): Position
{
  if(pos[0] < 0 || pos[1] < 0 || pos[0] > 9 || pos[1] > 9)
  {
    throw new Error("Position indexes must be inside the bounds! (initial)");
  }
  if(pos[0] + steps > 9 || pos[0] - steps < 0 || pos[1] + steps < 0 || pos[1] + steps > 9)
  {
    throw new Error("Position indexes must be inside the bounds! (final)");
  }
  switch (dir){
    case "N":
      let newPosN: Position = [pos[0], pos[1] += steps];
      return newPosN;
    case "E":
      let newPosE: Position = [pos[0] += steps, pos[1]];
      return newPosE;
    case "S":
      let newPosS: Position = [pos[0], pos[1] -= steps];
      return newPosS;
    case "W":
      let newPosW: Position = [pos[0] -= steps, pos[1]];
      return newPosW;
  }
}

export function run(start, dirs) {
  throw new Error("TODO distance");
}

export function distance(a, b) {
  throw new Error("TODO distance");
}

export function farthest(start, dirs) {
  throw new Error("TODO farthest");
}

export function where(pos, name) {
  throw new Error("TODO where");
}
