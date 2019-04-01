import { delay } from "bluebird";

// console.log("hi");


function reducer<itemType, resultType>(
    generatorFunction: (items: itemType[]) => IterableIterator<resultType>
): (items: itemType[]) => resultType;

function reducer<itemType, param2Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type) => IterableIterator<resultType>
): (items: itemType[], param2: param2Type) => resultType;

function reducer<itemType, param2Type, param3Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => IterableIterator<resultType>
): (items: itemType[], param2: param2Type, param3: param3Type) => resultType;

function reducer<itemType, param2Type, param3Type, param4Type, resultType>(
    generatorFunction: (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => IterableIterator<resultType>
): (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => resultType {

    return function (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) {
        const iterableIterator = generatorFunction(items, param2, param3, param4);
        return reduce(iterableIterator);
    }
}

function reduce<resultType>(
    iterableIterator: IterableIterator<resultType>
): resultType {
    iterableIterator.next();

    let lastYieldResult = iterableIterator.next();
    let lastYield = lastYieldResult.value;
    iterableIterator.next();

    while (!lastYieldResult.done) {
        lastYield = lastYieldResult.value;
        lastYieldResult = iterableIterator.next(lastYield);
        iterableIterator.next();
    }
    return lastYield;
}




function reducerAsync<itemType, resultType>(
    generatorFunction: (items: itemType[]) => AsyncIterableIterator<resultType>
): (items: itemType[]) => Promise<resultType>;

function reducerAsync<itemType, param2Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2: param2Type) => Promise<resultType>;

function reducerAsync<itemType, param2Type, param3Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2: param2Type, param3: param3Type) => Promise<resultType>;

function reducerAsync<itemType, param2Type, param3Type, param4Type, resultType>(
    generatorFunction: (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => Promise<resultType> {

    return async function (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) {
        const asyncIterableIterator = generatorFunction(items, param2, param3, param4);
        return await reduceAsync(asyncIterableIterator);
    }
}


async function reduceAsync<resultType>(
    asyncIterableIterator: AsyncIterableIterator<resultType>
): Promise<resultType> {
    await asyncIterableIterator.next();

    let lastYieldResult = await asyncIterableIterator.next();
    let lastYield = lastYieldResult.value;
    await asyncIterableIterator.next();

    while (!lastYieldResult.done) {
        lastYield = lastYieldResult.value;
        lastYieldResult = await asyncIterableIterator.next(lastYield);
        await asyncIterableIterator.next();
    }
    return lastYield;
}


function* alphaRed(alpha: string[]) {
    for (const letter of alpha) {
        const previousYield = (yield) || "";
        yield previousYield + letter;
    }
}
const concatAlpha = reducer(alphaRed);

const abc = ["a", "b", "c"];
const alphabet = concatAlpha(abc);

console.log("alphabet:");
console.log(alphabet);


/*async function addDelay(totalDelayed, addedDelay): Promise<number> {
    await delay(addedDelay);
    return totalDelayed + addDelay;
}*/

async function* delayAsyncOg(delayMilliseconds: number[]) {
    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        // yield addDelay(totalDelayedMilliseconds, delayMs);
        await delay(delayMs);
        yield totalDelayedMilliseconds + delayMs;
    }
}

async function* delayAsyncOgPlus(delayMilliseconds: number[], plus: number) {
    for (const delayMs of delayMilliseconds) {
        const totalDelayedMilliseconds: number = (yield) || 0;
        // yield addDelay(totalDelayedMilliseconds, delayMs);
        await delay(delayMs);
        yield totalDelayedMilliseconds + delayMs + plus;
    }
}

const delayAsync = reducerAsync(delayAsyncOg);
const delayPlusAsync = reducerAsync(delayAsyncOgPlus);

const delays = [500, 1500, 1000];

(async function () {
    const totalDelayed = await delayAsync(delays);
    console.log("totalDelayed:");
    console.log(totalDelayed);

    const totalDelayedPlus = await delayPlusAsync(delays, 1);
    console.log("totalDelayedPlus:");
    console.log(totalDelayedPlus);

    // for await (const d of delayAsyncOg(delays)) {
    //     console.log(d);
    // }

    const totalDelayed2 = await reduceAsync(delayAsyncOg(delays));
    console.log("totalDelayed2:");
    console.log(totalDelayed2);
})();


// -------------


const concatAlphaPlus = function* (alpha: string[], doodad: string) {
    for (const letter of alpha) {
        const previousYield = (yield) || "";
        yield previousYield + letter + doodad;
    }
};

/*const concatAlphaPlusser = concatAlphaPlus(abc, "J");

for (const cap of concatAlphaPlusser) {
    console.log("cap:");
    console.log(cap);
}*/

const redConcatAlphaPlus = reducer(concatAlphaPlus);

console.log("redConcatAlphaPlus():");
console.log(redConcatAlphaPlus(abc, "J"));

console.log("reduce(alphaRed(abc)):");
console.log(reduce(alphaRed(abc)));


console.log("reduce(alphaRed(abc)):");
console.log(reduce(concatAlphaPlus(abc, "Z")));
