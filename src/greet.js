// 01 — Hello, who?
// Make the tests in greet.test.js green. Run them with: node --test

export function greet(name) {
  if(name === undefined || name === "")
  {
    return "Hello, stranger!";
  }
  return "Hello, " + name + "!";
}
