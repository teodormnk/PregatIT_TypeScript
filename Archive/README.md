# 06 - The cat's homepage

The cats have a homepage now. All 240 of them are on it. It is slow, it is heavy, and nobody has measured it.

This week: understand the number that says a web page is heavy (EcoIndex), then make that number better without throwing cats away.

## Part 1 - the number

EcoIndex looks at three things on a page:

- DOM elements: work for the phone or laptop that shows the page
- HTTP requests: work for the servers
- KB transferred: work for the network

For each one it finds where your value sits among real web pages: the quantile, from 0 (lightest) to 20 (heaviest). Then:

```
score = 100 - 5 * (3 * qDom + 2 * qRequests + qSize) / 6
```

In `src/ecoindex/ecoindex.ts` write the types `Page` and `Grade`, then:

- `quantile(table, value)` - find the first border bigger than the value. The answer is the bucket number (starting at 0) plus how far into the bucket the value is. `quantile(DOM, 61)` is `1.5`: bucket 1 goes from 47 to 75 and 61 is halfway. Bigger than every border: 20.
- `ecoIndex(page)` - the formula above, with the three tables from the file.
- `grade(score)` - above 80 is A, above 70 B, above 55 C, above 40 D, above 25 E, above 10 F, the rest G.

The tests cover the basics. `grade` has three asserts for seven grades, so add what is missing before you write it.

```
node --test
npx tsc --noEmit
```

## Part 2 - the page

```
node src/homepage/build.ts
node src/homepage/serve.ts
```

Add `dist/` to your `.gitignore`. Open http://localhost:8080 and measure it: install the GreenIT-Analysis browser extension (Chrome or Firefox), open the dev tools, go to the GreenIT tab and run the analysis. Write down the EcoIndex, the grade and the three numbers.

Then put the same check in CI:

1. copy `../greenit-urls.yaml` to the root of your repo
2. add the job from `pr-checks-job.yml` to your PR Checks workflow

The job builds the page, serves it, measures it and fails under 75. Your first push will be red. That is the point.

Now change `build.ts` until the job is green.

- all 240 cats stay reachable from the homepage, each with name, quirk, naps and a picture
- don't touch `cats.ts` and don't touch the threshold
- one commit per change, with the score before and after in the message

The report (artifact `greenit-report` on the workflow run) shows which of the three numbers hurts most. Start there.

## In the PR description

- a small table: what you changed, DOM, requests, KB, score
- put your final three numbers into your own `ecoIndex()`. Same score as the tool?
- a change that removed a lot and moved the score very little. Why?
- one thing EcoIndex cannot see at all (hint: it never looks at the server)

## If you still have time

Measure the pipeline instead of the page: put Eco-CI (`green-coding-solutions/eco-ci-energy-estimation`) around your test step and look at the energy it reports for one run. Check its README first, by default it sends the numbers to its authors' server.
