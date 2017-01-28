//import { Stream, fromArray } from '../src/Observable';
import { fromArray } from '../src/operators';
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

});