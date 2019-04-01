export function reducer<itemType, resultType>(
    generatorFunction: (items: itemType[]) => IterableIterator<resultType>
): (items: itemType[]) => resultType;

export function reducer<itemType, param2Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type) => IterableIterator<resultType>
): (items: itemType[], param2: param2Type) => resultType;

export function reducer<itemType, param2Type, param3Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => IterableIterator<resultType>
): (items: itemType[], param2: param2Type, param3: param3Type) => resultType;

export function reducer<itemType, param2Type, param3Type, param4Type, resultType>(
    generatorFunction: (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => IterableIterator<resultType>
): (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => resultType {

    return function (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) {
        const iterableIterator = generatorFunction(items, param2, param3, param4);
        return reduce(iterableIterator);
    }
}

export function reduce<resultType>(
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


export function reducerAsync<itemType, resultType>(
    generatorFunction: (items: itemType[]) => AsyncIterableIterator<resultType>
): (items: itemType[]) => Promise<resultType>;

export function reducerAsync<itemType, param2Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2: param2Type) => Promise<resultType>;

export function reducerAsync<itemType, param2Type, param3Type, resultType>(
    generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2: param2Type, param3: param3Type) => Promise<resultType>;

export function reducerAsync<itemType, param2Type, param3Type, param4Type, resultType>(
    generatorFunction: (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => AsyncIterableIterator<resultType>
): (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) => Promise<resultType> {

    return async function (items: itemType[], param2?: param2Type, param3?: param3Type, param4?: param4Type) {
        const asyncIterableIterator = generatorFunction(items, param2, param3, param4);
        return await reduceAsync(asyncIterableIterator);
    }
}

export async function reduceAsync<resultType>(
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
