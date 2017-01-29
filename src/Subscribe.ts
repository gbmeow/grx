import { Stream, Listner, nonReturn, defaultError, defaultComplete} from './Observable';


export function subscribe<T>( 
    next: nonReturn,
    error: nonReturn = defaultError,
    complete: nonReturn = defaultComplete,
    stream: Stream<T> ): void {
    const listener: Listner<T> = {next, error, complete}
    const disposable = stream.source.run(listener);
}