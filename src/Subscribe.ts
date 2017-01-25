import { GStream } from './Observable';

export function subscribe( atSubscribe: Function, stream: GStream ) :void {
    stream( atSubscribe );
}