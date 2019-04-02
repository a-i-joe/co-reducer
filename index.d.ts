export declare function reducer<itemType, resultType>(generatorFunction: (items: itemType[]) => IterableIterator<resultType>): (items: itemType[]) => resultType;
export declare function reducer<itemType, param2Type, resultType>(generatorFunction: (items: itemType[], param2: param2Type) => IterableIterator<resultType>): (items: itemType[], param2: param2Type) => resultType;
export declare function reducer<itemType, param2Type, param3Type, resultType>(generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => IterableIterator<resultType>): (items: itemType[], param2: param2Type, param3: param3Type) => resultType;
export declare function reduce<resultType>(iterableIterator: IterableIterator<resultType>): resultType;
export declare function reducerAsync<itemType, resultType>(generatorFunction: (items: itemType[]) => AsyncIterableIterator<resultType>): (items: itemType[]) => Promise<resultType>;
export declare function reducerAsync<itemType, param2Type, resultType>(generatorFunction: (items: itemType[], param2: param2Type) => AsyncIterableIterator<resultType>): (items: itemType[], param2: param2Type) => Promise<resultType>;
export declare function reducerAsync<itemType, param2Type, param3Type, resultType>(generatorFunction: (items: itemType[], param2: param2Type, param3: param3Type) => AsyncIterableIterator<resultType>): (items: itemType[], param2: param2Type, param3: param3Type) => Promise<resultType>;
export declare function reduceAsync<resultType>(asyncIterableIterator: AsyncIterableIterator<resultType>): Promise<resultType>;
