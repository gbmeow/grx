import { subscribe } from './Subscribe';
import { map, PushArray } from './operators';

export class Stream<T> {
    constructor( public source: Source<T> ) {}
    subscribe( atSubscribe: <T>( value: T)=> void ) {
        subscribe( atSubscribe , this );
    } 

    map<T,R>( project: any  ):Stream<T>  {
        return map( project, this);
    }

    combineLatest<T, D, R>( combineFn: (x:T, y: R) => D, stream: Stream<T> ): Stream<R> {
        let x = [];
        let y = [];
        let indexX = 0;
        let indexY = 0;
        this.subscribe(( y )=> {
            x.push( y );
        });
        stream.subscribe(( x )=> {
            y.push( x );
        });
        return new Stream(  new PushArray( combineFn(<any>x[indexX++], <any>y[indexY++]) ) );
    }
}

export interface Source<T> {
    run: ( listner: Listner<T> ) => void;
}

export interface Listner<T>{
    next: (val) => void;
    error: (val) => void;
    complete: () => void;
}




