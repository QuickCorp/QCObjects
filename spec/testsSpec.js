#!/usr/bin/env node

describe('QCObjects Main Test', function () {
  require('../QCObjects');
  logger.debugEnabled=true;
  logger.infoEnabled=true;
  logger.warnEnabled=true;

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

  it('Existence of _DataStringify Function Helper', function () {
    expect(typeof _DataStringify).toEqual('function');
    logger.debug('Existence of _DataStringify Function Helper... OK');
  });

  it('Existence of CONFIG global Class', function () {
    expect(typeof CONFIG.__definition).toEqual('object');
    logger.debug('Existence of CONFIG global Class... OK');
  });

  it('global as QCObjects global', function () {
    expect(typeof global.__definition).toEqual('object');
    logger.debug('global as QCObjects global... OK');
  });

  it('Existence of QCObjects SDK', function () {
    expect(global.hasOwnProperty('_sdk_')).toEqual(true);
    logger.debug('Existence of QCObjects SDK... OK');
  });

})
