// 03 - knock it off the table

// TODO: name, fragile, and an optional owner
export type Item = {
  readonly name: string,
  readonly fragile: boolean,
  readonly owner?: string
};

// TODO: name and items
export type Table = {
  readonly name: string,
  readonly items: readonly Item[]
};

export function knockOff(table: Table, name: string): Table {
  // not viable: modifies in place
  // let copy: Table = table;
  // const { name: copyName, items: copyItems } = copy;
  // let pos = 0;
  // for(const item of copyItems) {
  //   if(item.name === name) {
  //     copyItems.splice(pos, 1);
  //   }
  //   pos++;
  // }
  // const result = {name: copyName, items: copyItems};
  let items: Item[] = [];
  let tabName: string = table.name;
  let initialList: readonly Item[] = table.items;
  for(const item of table.items) {
    if(item.name !== name) {
      items.push(item);
    }
  }
  if(items.length === initialList.length) {
    throw new Error("The item named '" + name + "' does not exist in the list");
  }
  return { name: tabName, items: items};
}

export function knockAllOff(table: Table): Table[] {
  let items: readonly Item[] = table.items;
  let tabName: string = table.name;
  let tabList: Table[] = [];
  let copyTable: Table = {name: tabName, items: items};
  for(const item of [...table.items].reverse()) { // because the test expects the knocking-off procedure to work from the tail to the head
    copyTable = knockOff(copyTable, item.name);
    tabList.push(copyTable);
  }
  return tabList;
}

export function rename(table: Table, from: string, to: string): Table {
  let items: Item[] = [];
  let tabName: string = table.name;
  for(let item of table.items) {
    if(item.name === from) {
      items.push({name: to, fragile: item.fragile, owner: item.owner});
    } else {
      items.push(item);
    }
  }
  return {name: tabName, items: items};
}

export function broken(before: Table, after: Table): string[] {
  let brokenList: string[] = [];
  for(let itemB of before.items) {
    if(itemB.fragile && !after.items.some((itemA) => itemA.name === itemB.name)) { // ambda which iterates with the itemA variable through the items array and compares each one of them with itemB
      brokenList.push(itemB.name);
    }
  }
  return brokenList;
}

export function whose(item: Item): string {
  if(!item.owner) {
    return "nobody's " + item.name;
  }
  return item.owner + "'s " + item.name;
}
