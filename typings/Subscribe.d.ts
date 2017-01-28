import { Stream } from '../src/Observable';
export declare function subscribe<T>(atSubscribe: (value: T) => any, stream: Stream<T>): void;
