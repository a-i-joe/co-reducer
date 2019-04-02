# co-reducer

A generator coroutine for writing readable reduce / fold / foldl functions.

Generator functions using this coroutine will have the following distinct behaviours:

- `yield` will not block.
- The first call to `yield` in each loop will supply the previously yielded value (the aggregated result so far).
- The second call to yield is for returning the aggregated result so far.
- Only the last yielded item is returned (one result, not an iterator).

Typescript typings are included with the package.

# Examples

## Concatenate some strings with `reducer`

```typescript
import { reducer } from "co-reducer";

const stringsConcater = reducer(function* (strings: string[]) {
    for (const str of strings) {
        const previousResult: string = (yield) || "";
        yield previousResult + str;
    }
});

console.log(
    stringsConcater(["a", "b", "c"])
);
// "abc"
```

## Concatenate some strings with `reduce` and extra parameter(s)

```typescript
import { reduce } from "co-reducer";

function* stringsConcaterGen(strings: string[], delimiter: string) {
    for (const str of strings) {
        const previousResult: string = (yield) || "";
        const optionalDelimiter = previousResult === "" ? "" : delimiter;
        yield previousResult + optionalDelimiter + str;
    }
}

console.log(
    reduce(stringsConcaterGen(["a", "b", "c"], ","))
);
// "a,b,c"
```

## Sum numbers with `reducerAsync` and extra parameter(s)

```typescript
import { delay } from "bluebird";
import { reducerAsync } from "co-reducer";

const sumDelaysAsync = reducerAsync(
    async function* (delayMilliseconds: number[], extraMs: number) {

    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        await delay(delayMs);
        yield totalDelayedMilliseconds + delayMs + extraMs;
    }
});

(async function () {

    console.log(
        await sumDelaysAsync([500, 1500, 1000], 1)
    );
    // 3003

})()
```

## Sum numbers with `reduceAsync`

```typescript
import { delay } from "bluebird";
import { reduceAsync } from "co-reducer";

async function addDelay(totalDelayedMilliseconds: number, delayMs: number): Promise<number> {
    await delay(delayMs);
    return totalDelayedMilliseconds + delayMs;
}

async function* delayPlusAsyncGen(delayMilliseconds: number[]) {
    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        yield addDelay(totalDelayedMilliseconds, delayMs);
    }
}

(async function () {

    console.log(
        await reduceAsync(delayPlusAsyncGen([500, 1500, 1000]))
    );
    // 3000

})()
```

# Requirements

The typescript targets `esnext` compilation.

No libraries used.