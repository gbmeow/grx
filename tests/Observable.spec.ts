import { Observable } from '../src/Observable';
import { subscribe  } from '../src/Subscribe';
import { map } from '../src/operators';

import { expect } from 'chai';
import 'mocha';

describe('Observable function', () => {

  it('should return of', () => {
    const stream = new Observable().of( 10 );
    subscribe( (x) => expect( x ).to.equal( 10 ), stream);
  });

  it('should map stream', () => {
    const stream = map( x => {}, new Observable().of( 10 ) );
    subscribe( (x) => expect( x ).to.equal( 200 ), stream);
  });

});