// 06 - ecoindex
//
// The three tables are the EcoIndex reference data (github.com/cnumr/ecoindex_reference).
// 21 numbers each: the borders between 20 buckets of real web pages, lightest to heaviest.

export const DOM = [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601];
export const REQUESTS = [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920];
export const SIZE_KB = [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26];

// TODO: dom, requests, sizeKb
export type Page = {};

// TODO: "A" to "G"
export type Grade = string;

export function quantile(table: number[], value: number): number {
  throw new Error("TODO quantile");
}

export function ecoIndex(page: Page): number {
  throw new Error("TODO ecoIndex");
}

export function grade(score: number): Grade {
  throw new Error("TODO grade");
}
