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
 * Cats are liquid: the box area must be at least 70% of the cat's area, => box.length * box.width >= (cat.width * cat.length) * 0.7
 * and the box's shorter side at least half the cat's width. => box.width >= cat.width / 2
 */
export function fits(cat: Cat, box: Box): boolean {
    return (box.width * box.depth >= (cat.width * cat.length) * 0.7 && box.width >= (cat.width / 2));
}

/** The smallest box (by area) the cat fits in; the first one on a tie; null if none. */
export function bestBox(cat: Cat, boxes: readonly Box[]): Box | null {
  //traditional, unefficient:
  // var smallest: Box = {width: Number.MAX_VALUE, depth: Number.MAX_VALUE};
  // for(var i: number = 0; i < boxes.length; ++i)
  // {
  //   if(boxes[i]?.depth * boxes[i]?.width < smallest.width * smallest.depth && fits(cat, boxes[i]?))
  //   {
  //     smallest = boxes[i];
  //   }
  // }
  // if(smallest.width !== Number.MAX_VALUE && smallest.depth !== Number.MAX_VALUE)
  //   return smallest;
  // return null;

  let smallest: Box | null = null;

  for(const box of boxes){
    if(fits(cat, box) && (smallest === null || box.width * box.depth < smallest.width * smallest.depth)){
      smallest = box;
    }
  }
  return smallest;
}

/**
 * Each cat, in order, takes its best box among those still free.
 * `boxes` must come out exactly as it went in.
 */
export function seat(cats: readonly Cat[], boxes: readonly Box[]): Seating[] {
  //doesn't work
  // let organised: Seating[] = [];
  // for(const cat in cats){
  //   let seat: Box | null = bestBox(cats[Number(cat)], boxes);
  //   let seatIdx: number = boxes.indexOf(seat)
  //   if(seat !== null && boxes[seatIdx].cat === undefined){
  //
  //   }
  // }
  const available: Box[] = [...boxes]; //
  const organised: Seating[] = [];

  //Nota informativa:
  //for(const ceva IN altceva) => ceva este index, salvat ca STRING
  //for(const ceva OF altceva) => ceva este OBIECTUL EFECTIV, salvat ca TIP CONCRET AL OBIECTULUI

  for(const cat of cats){
    const box: Box | null = bestBox(cat, available);
    if(box === null){
      organised.push({cat, box: null});
      continue;
    }

    const boxIndex = available.indexOf(box);
    if(boxIndex === -1){
      throw new Error("seat: selected box was not found");
    }

    organised.push({cat, box});
    available.splice(boxIndex, 1);
  }
  return organised;
}

/** "shoebox (30×20)" or "unlabelled box (30×20)". The × is U+00D7. */
export function describe(box: Box): string {
  let description: string = "";
  if(box.label === undefined || box.label === ""){
    description += "unlabelled box ";
  } else {
    description += box.label + " ";
  }
  description += "(" + box.width + "×" + box.depth + ")";
  return description;
}
