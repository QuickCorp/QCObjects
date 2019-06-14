#!/usr/bin/env node

describe('QCObjects Main Test', function () {
  require('qcobjects');

  it('Class Declaration Test Spec', function () {
    Class('Main', Object, {
      _new_: (o) => {
        let main = this
      }
    })

    expect(Main).toEqual(ClassFactory('Main'));
    logger.debug('Class Declaration Test Spec... OK');
  });

  it('Main intance Test Spec', function () {
    let __main__ = New(Main, {})
    expect(typeof __main__.__instanceID).toEqual('number');
    expect(__main__.__classType).toEqual('Main')
    logger.debug('Main intance Test Spec... OK');
  });

  it('Existence of Component Class', function () {
    expect(Component).toEqual(ClassFactory('Component'));
    logger.debug('Existence of Component Class... OK');
  });

  it('Existence of Effect Class', function () {
    expect(Effect).toEqual(ClassFactory('Effect'));
    logger.debug('Existence of Effect Class... OK');
  });

  it('global as QCObjects global', function () {
    expect(typeof global.__definition).toEqual('object');
    logger.debug('global as QCObjects global... OK');
  });

  it('Existence of QCObjects SDK', function () {
    expect(typeof global._sdk_).toEqual('object');
    logger.debug('Existence of QCObjects SDK... OK');
  });

})
