#!/usr/bin/env node
/* eslint-disable no-undef */

import QCObjects from "../src/QCObjects";
const logger = QCObjects.logger;
const Class = QCObjects.Class;
const ClassFactory = QCObjects.ClassFactory;
const __getType__ = QCObjects.__getType__;
describe("Type Spec", function () {
  logger.debugEnabled=true;
  logger.infoEnabled=true;
  logger.warnEnabled=true;

  it("Type Test Spec", function () {
    class CustomType {
      method1 () {
        return "method1";
      }
    }
    const Main = ClassFactory("Main");
    Class("Main", CustomType, {});
    class CustomMain extends Main {}
    var main = new CustomMain();

    expect(__getType__(Main)).toEqual("Main");
    expect(__getType__(CustomMain)).toEqual("CustomMain");
    expect(__getType__(main)).toEqual("CustomMain");
    logger.debug("Type Test Spec... OK");
  });


});
