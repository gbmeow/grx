export declare class Stream<T> {
    source: Source<T>;
    constructor(source: Source<T>);
    subscribe(atSubscribe: <T>(value: T) => void): void;
    map<T, R>(project: any): Stream<T>;
    combineLatest<T, D, R>(combineFn: (x: T, y: R) => D, stream: Stream<T>): Stream<R>;
}
export interface Source<T> {
    run: (listner: Listner<T>) => void;
}
export interface Listner<T> {
    next: (val) => void;
    error: (val) => void;
    complete: () => void;
}
