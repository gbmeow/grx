import { Stream, Listner, nonReturn, defaultError, defaultComplete} from './Observable';

interface Disposable {
    dispose(): void;
}

export function subscribe<T>( 
    next: nonReturn,
    error: nonReturn = defaultError,
    complete: nonReturn = defaultComplete,
    stream: Stream<T> ): Disposable {
    const disposableFn = ()=> {
        stream.complete();
    }
    const listener: Listner<T> = {next, error, complete}
    const disposable = stream.source.run(listener);
    return { dispose: disposableFn };
}