import { Stream, Listner, Source } from './Observable';
import { subscribe  } from '../src/Subscribe';

export function map<T, R>( predicate: (value: T) => R, stream: Stream<T> ):Stream<T> {
        let res:Array<any> = [];
        stream.subscribe( (result:any) => {
            res.push(result);
        });
        return new Stream( new Map( predicate, res) );

}

export function interval<T>( tickMs: number ):Stream<T> {
    return new Stream( new Interval( tickMs ) );
}


export class Interval<T> implements Source<T> {
    private listner: Listner<T>;
    private intervalId: number;
    constructor( private tickMs: number ) {}
    run(listner: Listner<T>) {
        this.listner = listner;
        if( this.tickMs > 1000000 ) {
            this.error( new Error(' dude you will kill browser ') );  
        }
        
        let counter = 0;
        this.intervalId = setInterval(()=> {
            listner.next( counter++ );
        }, this.tickMs);
    }
    error( err: Error ) {
        this.listner.error( new Error() );
    }
    complete() {
        clearInterval( this.intervalId );
        this.listner.complete();
    }
}


export function take<T>( stream:Stream<T>, numToTake: number ):any {    
    return new Stream( new Take( stream, numToTake ) ); 
}


export function fromArray( values:any ) {
    return new Stream( new FromArray( values ) ); 
}

export class Take<T> {
    private listner: Listner<T>;
    constructor( private stream: Stream<T>, private total: number) {}
    run(listner: Listner<T>) {
        if( this.total < 0) {
            listner.error( new Error( 'numTake should be greater then 0') );
            return;
        }
        let counter = 0;
        this.stream.subscribe((value:T)=> {
            listner.next( value );
            ++counter;
            if( counter === this.total ) {
                listner.complete();
                //TODO: Review - should an operator -
                    //should be able to complete 
                    //&& unsubscribe 
                //TODO: Is this scalable?
                    //now each operator 
                    //will have to implement a custom logic 
                    //IS this where some kind of PROXY comes into place
                this.stream.source.complete();
            }
        })
           
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


export function multicast<T>( stream:Stream<T> ) {
    return new Stream( new Multicast( stream ) ); 
}

// stream.subscribe() -> stream.source.run() ->  
export class Multicast<T> implements Source<T> {
    private listners: Listner<T>[];
    private count: number;
    constructor( private original: Stream<T>  ) {
        this.listners = [];
        this.count = 0;
    }
    run(listner: Listner<T>) {
        this.add ( listner );
        if( this.count === 1)
            //this is really clever 
                //this = subscribe() 
            this.original.source.run( this );
        this.count++;
        //this.original.source && this.source disposable
    }

    next( val: any ): void  {
        const listners = this.listners;
        listners.forEach( ( l: Listner<T>  )=> l.next( val )  ); 
    }

    add( listner: Listner<T>  ) {
        this.listners = this.listners.concat( listner );
        return this.listners.length;
    }
    error(err: Error) {
        this.listners.forEach( ( l: Listner<T>  )=> l.error( err )  );
    }
    complete() {
        this.listners.forEach( ( l: Listner<T>  )=> l.complete()  );
    }
}

