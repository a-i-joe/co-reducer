import { delay } from "bluebird";
import { reducer } from "./index";
import { reduce } from "./index";
import { reducerAsync } from "./index";
import { reduceAsync } from "./index";


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



const sumDelaysAsync = reducerAsync(async function* (delayMilliseconds: number[], extraMs: number) {
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

})();




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

})();
