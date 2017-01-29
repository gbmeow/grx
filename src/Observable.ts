import { subscribe } from './Subscribe';
import { map, PushArray, take } from './operators';

//contracts
//map() -> Stream<T> --- Reason: You give values -> you get result
//take() -> Stream<T> --- 
        //However: Internally - it is subscribed to previous stream
        //Reason: We need to manage the values, as they arrive 
        //from previous stream 
        //and take() - requires that the values are passed through as they arrive

export const defaultError = (val:Error) => {};
export const defaultComplete = ()=> {};
export type nonReturn = <T>( value?: T)=> void;

export class Stream<T> {
    constructor( public source: Source<T> ) {}
    subscribe(  next: nonReturn,
                error: nonReturn = defaultError,
                complete: nonReturn = defaultComplete) {
        
        subscribe( next, error, complete, this );
    } 

    map<T,R>( project: any  ):Stream<T>  {
        return map( project, this);
    }

    take( numToTake: number ):Stream<T> {
        return take(this, numToTake);
    }

    combineLatest<T, D, R>( combineFn: (x:T, y: R) => D, stream: Stream<T> ): Stream<R> {
        let x:Array<any> = [];
        let y:Array<any> = [];
        let indexX:number = 0;
        let indexY:number = 0;
        this.subscribe(
            ( y:any )=> { x.push( y ) }
        
        );
        stream.subscribe(( x:any )=> {
            y.push( x );
        });
        return new Stream(  new PushArray( combineFn(x[indexX++], y[indexY++]) ) );
    }
}

export interface Source<T> {
    run: ( listner: Listner<T> ) => void;
    next?: (value: any) => void;
    complete?: () => void;
}

export interface Listner<T>{
    next: (val:any) => void;
    error: (val:Error) => void;
    complete: () => void;
}




