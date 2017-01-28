import { Stream, Listner } from './Observable';
import { subscribe  } from '../src/Subscribe';

export function map<T, R>( predicate: (value: T) => R, stream: Stream<T> ):Stream<T> {
        let res = [];
        stream.subscribe( (result:any) => {
            res.push(result);
        });
        return new Stream( new Map( predicate, res) );

}


export function fromArray( values ) {
    return new Stream( new FromArray( values ) ); 
}


export class FromArray<T> {
    constructor( private values: T[]) {}
    run(listner: Listner<T>) {
        this.values.forEach( listner.next );
    }
}

export class PushArray<T> {
    constructor( private values: T) {}
    run(listner: Listner<T>) {
        listner.next( this.values );
    }
}

export class Map<T> {
    constructor( private valueFn: any, private vals: any) {}
    run(listner: Listner<T>) {
        this.vals.forEach( (x)=> {
            listner.next( this.valueFn(x) ) 
        });
    }
}

