import { Stream, Listner } from './Observable';
import { subscribe  } from '../src/Subscribe';

export function map<T, R>( predicate: (value: T) => R, stream: Stream<T> ):Stream<T> {
        let res:Array<any> = [];
        stream.subscribe( (result:any) => {
            res.push(result);
        });
        return new Stream( new Map( predicate, res) );

}


export function take<T>( stream:Stream<T>, numToTake: number ):any {    
    let values = [];
    stream.subscribe( res => values.push(res) )
    return new Stream( new Take( values, numToTake ) ); 
}


export function fromArray( values:any ) {
    return new Stream( new FromArray( values ) ); 
}

export class Take<T> {
    private listner: Listner<T>;
    constructor( private values: T[], private numTake: number) {}
    run(listner: Listner<T>) {
        this.listner = listner;
        let counter = 0;
        while( counter < this.numTake ) {
            listner.next( this.values[counter++] );
        }
        listner.complete();
    }
    next( value: T) {
        this.listner.next( value );
    }
    complete() {
        this.listner.complete();
    }
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
        this.vals.forEach( (x:any)=> {
            listner.next( this.valueFn(x) ) 
        });
    }
}

