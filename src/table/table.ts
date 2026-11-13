// 03 - knock it off the table

// TODO: name, fragile, and an optional owner
export type Item = {};

// TODO: name and items
export type Table = {};

export function knockOff(table: Table, name: string): Table {
  throw new Error("TODO knockOff");
}

export function knockAllOff(table: Table): Table[] {
  throw new Error("TODO knockAllOff");
}

export function rename(table: Table, from: string, to: string): Table {
  throw new Error("TODO rename");
}

export function broken(before: Table, after: Table): string[] {
  throw new Error("TODO broken");
}

export function whose(item: Item): string {
  throw new Error("TODO whose");
}
