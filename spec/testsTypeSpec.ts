#!/usr/bin/env node

import { __getType__, Class, ClassFactory, logger } from "../src/QCObjects";

/* eslint-disable no-undef */

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
    Class("Main", CustomType, {});
    const Main = ClassFactory("Main");
    class CustomMain extends Main {}
    var main = new CustomMain();

    expect(__getType__(Main)).toEqual("Main");
    expect(__getType__(CustomMain)).toEqual("CustomMain");
    expect(__getType__(main)).toEqual("CustomMain");
    logger.debug("Type Test Spec... OK");
  });


});
