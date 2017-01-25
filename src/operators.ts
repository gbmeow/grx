import { GStream } from './Observable';
import { subscribe  } from '../src/Subscribe';

type MapFn = <T, R>( a: T ) => R;

export function map( fn: MapFn, stream: GStream):GStream {
    return function( atSubscribe ):void {
        subscribe( (result) => {
            atSubscribe( fn( result ) );
        }, stream);
    }
}
 