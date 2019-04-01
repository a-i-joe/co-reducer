import { delay } from "bluebird";
import * as chai from "chai";
import {
    reduce,
    reduceAsync,
    reducer,
    reducerAsync
    } from "./index";
const expect = chai.expect;


// sync tests

const abc = ["a", "b", "c"];

function* alphaConcatGen(alpha: string[]) {
    for (const letter of alpha) {
        const previousYield = (yield) || "";
        yield previousYield + letter;
    }
}

const alphaConcater = reducer(alphaConcatGen);
const alphaConcaterResult = alphaConcater(abc);
console.log("alphaConcaterResult:");
console.log(alphaConcaterResult);
expect(alphaConcaterResult).to.equal("abc");

const alphaConcatResult = reduce(alphaConcatGen(abc));
console.log("alphaConcatResult:");
console.log(alphaConcatResult);
expect(alphaConcatResult).to.equal("abc");

function* alphaConcatPlusGen(alpha: string[], doodad: string) {
    for (const letter of alpha) {
        const previousYield = (yield) || "";
        yield previousYield + letter + doodad;
    }
};

const alphaConcaterPlus = reducer(alphaConcatPlusGen);
const alphaConcaterPlusResult = alphaConcaterPlus(abc, "|");
console.log("alphaConcaterPlusResult:");
console.log(alphaConcaterPlusResult);
expect(alphaConcaterPlusResult).to.equal("a|b|c|");

const alphaConcatPlusResult = reduce(alphaConcatPlusGen(abc, "|"));
console.log("alphaConcatPlusResult:");
console.log(alphaConcatPlusResult);
expect(alphaConcatPlusResult).to.equal("a|b|c|");


// async tests

const delays = [500, 1500, 1000];

async function* delayAsyncGen(delayMilliseconds: number[]) {
    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        await delay(delayMs);
        yield totalDelayedMilliseconds + delayMs;
    }
}

const delayerAsync = reducerAsync(delayAsyncGen);

(async function () {
    const delayerAsyncResult = await delayerAsync(delays);
    console.log("delayerAsyncResult:");
    console.log(delayerAsyncResult);
    expect(delayerAsyncResult).to.equal(3000);

    const delayAsyncResult = await reduceAsync(delayAsyncGen(delays));
    console.log("delayAsyncResult:");
    console.log(delayAsyncResult);
    expect(delayAsyncResult).to.equal(3000);
})();

async function addDelay(totalDelayedMilliseconds: number, delayMs: number, plus: number): Promise<number> {
    await delay(delayMs);
    return totalDelayedMilliseconds + delayMs + plus;
}

async function* delayPlusAsyncGen(delayMilliseconds: number[], plus: number) {
    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        yield addDelay(totalDelayedMilliseconds, delayMs, plus);
    }
}

const delayerPlusAsync = reducerAsync(delayPlusAsyncGen);

(async function () {
    const delayerPlusAsyncResult = await delayerPlusAsync(delays, 1);
    console.log("delayerPlusAsyncResult:");
    console.log(delayerPlusAsyncResult);
    expect(delayerPlusAsyncResult).to.equal(3003);

    const delayPlusAsyncResult = await reduceAsync(delayPlusAsyncGen(delays, 1));
    console.log("delayPlusAsyncResult:");
    console.log(delayPlusAsyncResult);
    expect(delayPlusAsyncResult).to.equal(3003);
})();

