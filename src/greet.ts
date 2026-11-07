// 01 — Hello, who?
// Make the tests in greet.test.ts green. Run them with: node --test

export function greet(name?: string): string {
  if(name === undefined || name === "")
  {
    return "Hello, stranger!";
  }
  return "Hello, " + name + "!";
}
