//import { Stream, fromArray } from '../src/Observable';
import { fromArray, interval, multicast } from '../src/operators';
import { subscribe } from '../src/Subscribe';

import { expect } from 'chai';
import 'mocha';

describe('Observable function', () => {

  it('should return from Array', (done) => {
    const expected = [1, 2, 3, 4, 5];
    const stream = fromArray(expected.slice());

    stream.subscribe(function (x) {
      expect(x).to.be.equal(expected.shift());

      if (expected.length === 0)
        done();
    })
  });


  it('should map', (done) => {
    const expected = [1, 2, 3, 4, 5].map( x=> x * 100);
    const stream = fromArray(expected.map( x=> x / 100));

    stream.map( x=> x * 100 ).subscribe(function (x) {
      expect(x).to.be.equal(expected.shift());

      if (expected.length === 0)
        done();
    })
  });


    it('should combineLatest', (done) => {
    const a = [1, 2, 3, 4, 5]
    const b =  a.map( x=> x * 100);
    const expected = [101, 202, 303, 404, 505];
    const stream = fromArray(a);
    const streamB = fromArray(b);

    
    stream.combineLatest( (x:any, y:any) => x + y, streamB).subscribe(function (x) {
      expect(x).to.be.equal(expected.shift());
      done();
    })
  });

  it('should take #', (done) => {
    const input = [1, 2, 3, 4, 5, 6]
    const expected = input.slice(0, input.length -1);
    const stream = fromArray(input);
    
    stream.take(5).subscribe(
      (x) => { expect(x).to.be.equal(expected.shift())}, 
      (error) => console.log(error), 
      ()=> done()
    );
  });

  it('should should error take i < 0', (done) => {
    const input = [1, 2, 3, 4, 5, 6]
    const expected = input.slice(0, input.length -1);
    const stream = fromArray(input);
    
    stream.take(-1).subscribe(
      (x) => { }, 
      (error) => {  
          expect(error).to.be.exist; done() }, 
      ()=> console.log( ' never completes ')
    );

  });


describe('.interval()',()=> {
  it('should do an interval', (done) => {
    const stream = interval( 200 );
    let counter = 0; //2000ms per test = 200 * 10 
    let iterations = 2;
    stream.take( iterations ).subscribe(
      (x) => { 
        expect(true).to.be.equal(true);
        ++counter;
        if( counter === iterations )
          done();
      }, 
      (error) => console.log(error), 
      ()=> {},
    );
  });

    it('should dispose an interval', (done) => {
      const stream = interval( 200 );
      let counter = 0; //2000ms per test = 200 * 10 
      let iterations = 2;

      const dispose = stream.subscribe(
        (x) => { }, 
        (error) => console.log(error), 
        ()=> done()
      );

      dispose.dispose();

   });

    it('should error in flight ', (done) => {
      const stream = interval( 1000001 );
      let counter = 0; //2000ms per test = 200 * 10 
      let iterations = 2;

      const dispose = stream.subscribe(
        (x)=>{}, 
        (error)=>done(), 
        ()=>{}
      );

   });

});


describe('.multicast()',()=> {
  it('should multicast', (done) => {
    const stream = multicast( interval( 200 ) );
    let counter = 0; //2000ms per test = 200 * 10 
    let iterations = 5;

    stream.subscribe(
      (x) => { 
        //expect( x ).to.be.equal( counter++ );
        ++counter;
        if( counter === iterations )
          done();
      }, 
      (error) => console.log(error), 
      ()=> console.log( ' complete '),
    );

    stream.subscribe(
      (x) => { 
        //expect( x ).to.be.equal( counter++ );
        ++counter;
        if( counter === iterations )
          done();
      }, 
      (error) => console.log(error), 
      ()=> console.log( ' complete '),
    );


  });

  it('should dispose of multicast', (done) => {
    const stream = multicast( interval( 200 ) );
    let counter = 0; //2000ms per test = 200 * 10 
    let iterations = 5;

    const dispose = stream.subscribe(
      (x) => {}, 
      (error) => console.log(error), 
      ()=> done() 
    );

    dispose.dispose();

  });

});

});