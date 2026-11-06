# 01 — Hello, who?

There is a robot at the door of the lab. It greets everyone who comes in. Right now it says nothing, and when it does start talking it must never say "Hello, !" to anyone.

```js
greet("Johny")   // "Hello, Johny!"
greet("")        // "Hello, stranger!"
greet()          // "Hello, stranger!"
```

**Time:** about 20 minutes. **New today:** a function, a string, a default value.

## Do this

1. `git switch main && git pull && git switch -c exercise-01`
2. Copy `src/greet/greet.js` and `src/greet/greet.test.js` into your repository, same paths.
3. Run `node --test`. Red. Good: now you know what "done" looks like.
4. Open `greet.js` and make the tests green. Only that file.
5. Push, open a pull request called `ex01: greet`, ask a classmate to review it.

## Part 2 — the robot gets manners

People type their names badly. Make these pass too (they are at the bottom of the test file, commented out; uncomment them):

```js
greet("  ana ")   // "Hello, Ana!"
greet("MARIO")    // "Hello, Mario!"
```

You will want `.trim()`, `.toLowerCase()`, `.toUpperCase()` and `.slice()`. Look them up on MDN: search "MDN string trim".

## Friday

Be ready to change one thing live: make the robot say "Good morning, Ana!" before noon and "Hello, Ana!" after. What would you need that you do not have yet?
