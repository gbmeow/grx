


## Implemenation of RXJS - for learning purposes

## Overview 

//contracts
//map() -> Stream<T> --- Reason: You give values -> you get result
//take() -> Stream<T> --- 
        //However: Internally - it is subscribed to previous stream
        //Reason: We need to manage the values, as they arrive 
        //from previous stream 
        //and take() - requires that the values are passed through as they arriv

## TODO 

//TODO 
[ x ] add Multicast 
[   ] add MulticastDisposable()

[   ] Replay subject 
    https://github.com/mostjs-community/subject/blob/master/src/sources/HoldSubjectSource.ts

[] opertors 
    //switchMap 
    //join - flatMap
    //upate .take()

[] optimiation 
    //operator fusion
    //filter -> map (chaining)
        //previously they filterd 
        //now they want to map
            //so I will apply fliterMap ( 1 operator )
            ```
            function map(f, stream) {
                const soource = stream.source;

                if (source instanceof Filter)
                    return filterMap(f, soource.f, source)

                return Map(f, source)
            }
            ```
[] new
    //co-mutation 
        //take(2).map(f).skip(2)
            //https://github.com/mostjs/core/blob/master/src/combinator/slice.js
        //lodash - co-mutates


//later 
    //scheduler

## Running Tests

```
npm test
```