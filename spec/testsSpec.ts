#!/usr/bin/env node

import { _DataStringify, Class, ClassFactory, Component, CONFIG, Effect, logger, New, global, InheritClass, __getType__, _QC_CLASSES } from "qcobjects";


/* eslint-disable no-undef */


describe("qcobjects", function () {
  logger.debugEnabled=true;
  logger.infoEnabled=true;
  logger.warnEnabled=true;

  it("Class Declaration Test Spec", function () {
    const Main = Class("Main", Object, {
      _new_: () => {
      }
    });

    expect(Main).toEqual(ClassFactory("Main"));
    logger.debug("Class Declaration Test Spec... OK");
  });

  it("Main intance Test Spec", function () {
    class Main extends InheritClass {}
    let __main__ = New(Main, {});
    expect(typeof __main__.__instanceID).toEqual("number");
    expect(__main__.__classType).toEqual("Main");
    logger.debug("Main intance Test Spec... OK");
  });

  it("Existence of Component Class", function () {
    expect(Component).toEqual(ClassFactory("Component"));
    logger.debug("Existence of Component Class... OK");
  });

  it("Existence of Effect Class", function () {
    expect(Effect).toEqual(ClassFactory("Effect"));
    logger.debug("Existence of Effect Class... OK");
  });

  it("Existence of _DataStringify Function Helper", function () {
    expect(typeof _DataStringify).toEqual("function");
    logger.debug("Existence of _DataStringify Function Helper... OK");
  });

  it("Existence of CONFIG global Class", function () {
    expect(__getType__(CONFIG)).toEqual("CONFIG");
    logger.debug("Existence of CONFIG global Class... OK");
  });

  it("global as QCObjects global", function () {
    expect(__getType__(global)).not.toEqual("");
    logger.debug("global as QCObjects global... OK");
  });


});
