// 02 - zoomies

export type Position = [number, number]; // [x, y]
export type Dir = "N" | "E" | "S" | "W";

export const ROOM = 10; // 10x10, coordinates 0..9

// TODO: type the parameters and the return values. tsc complains until you do.

export function move(pos: Position, dir: Dir, steps = 1): Position
{

  if(pos[0] < 0 || pos[1] < 0 || pos[0] >= ROOM || pos[1] >= ROOM)
  {
    throw new Error("Position indexes must be inside the bounds! (initial position)");
  }
  // initial:
  // if(pos[0] + steps > 9 || pos[0] - steps < 0 || pos[1] + steps < 0 || pos[1] + steps > 9)
  // {
  //   throw new Error("Position indexes must be inside the bounds! (final)");
  // }
  // switch (dir){
  //   case "N":
  //     let newPosN: Position = [pos[0], pos[1] += steps];
  //     return newPosN;
  //   case "E":
  //     let newPosE: Position = [pos[0] += steps, pos[1]];
  //     return newPosE;
  //   case "S":
  //     let newPosS: Position = [pos[0], pos[1] -= steps];
  //     return newPosS;
  //   case "W":
  //     let newPosW: Position = [pos[0] -= steps, pos[1]];
  //     return newPosW;
  // }
  const directionDict: Record<Dir, Position> = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0]
  };
  const newPos: Position = [
      Math.max(0, Math.min(ROOM - 1, pos[0] + directionDict[dir][0] * steps)),
    Math.max(0, Math.min(ROOM - 1, pos[1] + directionDict[dir][1] * steps))
  ];
  // not respecting the test conditions
  // if(newPos[0] < 0 || newPos[1] < 0 || newPos[0] >= ROOM || newPos[1] >= ROOM)
  // {
  //   throw new Error("Position indexes must be inside the bounds! (final position)")
  // }
  return newPos;
  // I changed the method because the original one apparently was modifying the original value at incrementations/decrementations => not respecting the "const" condition => test failure
}

export function run(start: Position, dirs: Dir[]): Position[] {
  let result: Position[] = [];
  result.push([start[0], start[1]]);
  for(let direction of dirs){
    let lastPos: Position = result[result.length - 1]!; //"!" at the final of the assertion instruction insures that the assertion is non-null
    result.push(move(lastPos, direction));
  }
  return result;
}

export function distance(a: Position, b: Position): number {
  // return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); // in cases like this, we must use the Manhattan distance due to the directions restriction
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function farthest(start: Position, dirs: Dir[]): Position {
  let current: Position = [start[0], start[1]];
  let result: Position = [start[0], start[1]];
  let maxDist: number = 0;
  for(let direction of dirs) {
    current = move(current, direction);
    if(distance(start, current) > maxDist) {
      maxDist = distance(start, current);
      result = current;
    }
  }
  return result;
}

export function where(pos: Position, name?: string): string {
  if(!name)
  {
    return "the cat is at (" + pos[0] + ", " + pos[1] + ")";
  }
  return name + " is at (" + pos[0] + ", " + pos[1] + ")";
}
