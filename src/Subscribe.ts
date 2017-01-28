import { Stream, Listner } from './Observable';

export function subscribe<T>( atSubscribe: (value: T) => any, stream: Stream<T> ): void {
    const listener: Listner<T> = {
        next: atSubscribe,
        error: (err: Error) => {
            console.log(err);
        },
        complete() {
            console.log('complete');
        }
    }

    const disposable = stream.source.run(listener);
}