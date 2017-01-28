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
        let x:Array<any> = [];
        let y:Array<any> = [];
        let indexX:number = 0;
        let indexY:number = 0;
        this.subscribe(( y:any )=> {
            x.push( y );
        });
        stream.subscribe(( x:any )=> {
            y.push( x );
        });
        return new Stream(  new PushArray( combineFn(x[indexX++], y[indexY++]) ) );
    }
}

export interface Source<T> {
    run: ( listner: Listner<T> ) => void;
}

export interface Listner<T>{
    next: (val:any) => void;
    error: (val:Error) => void;
    complete: () => void;
}




