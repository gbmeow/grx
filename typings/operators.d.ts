import { Stream, Listner } from '../src/Observable';
export declare function map<T, R>(predicate: (value: T) => R, stream: Stream<T>): Stream<T>;
export declare function fromArray(values: any): Stream<{}>;
export declare class FromArray<T> {
    private values;
    constructor(values: T[]);
    run(listner: Listner<T>): void;
}
export declare class PushArray<T> {
    private values;
    constructor(values: T);
    run(listner: Listner<T>): void;
}
export declare class Map<T> {
    private valueFn;
    private vals;
    constructor(valueFn: any, vals: any);
    run(listner: Listner<T>): void;
}
