import { sayHello } from './functions/getSurf';

describe('Surf Report App', () => {
  describe('sayHello', () => {
    it('Returns back the argument as a string', () => {
      expect(sayHello('Hello!')).toEqual('Hello!')
    })
    // it('does antoher thing', () => {
    //   expect(nameOfFunction(args)).toEqual('expected output')
    // })
  })

  // describe('another function', () => {
  //   it('does a thing', () => {
  //     expect(nameOfFunction(args)).toEqual('expected output')
  //   })
  //   it('does antoher thing', () => {
  //     expect(nameOfFunction(args)).toEqual('expected output')
  //   })
  // })

})
