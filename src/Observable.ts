export type GStream = ( fn: Function ) => void;  

export class Observable {

    constructor() {}

    of<T>( a: T ):GStream {
        return function( fn: Function ): void {
            fn( a );
        }
    }

}




