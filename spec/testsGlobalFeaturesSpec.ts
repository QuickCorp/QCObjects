#!/usr/bin/env node

import { __getType__, logger, global } from "../src/qcobjects";

/* eslint-disable no-undef */

describe("qcobjects", function () {
    it("Existence of global.PackagesList Spec", function () {
        let packagesList:any[] = global.PackagesList;
        expect(__getType__(packagesList)).toBe("Array");
  
        logger.debug("Existence of global.PackagesList Spec... OK");
    });
  
    it("Existence of global.ClassesList Spec", function () {
        logger.debugEnabled=true;
        logger.infoEnabled=true;
        logger.warnEnabled=true;
        let classesList:any[] = global.ClassesList;
        expect(__getType__(classesList)).toBe("Array");
  
        logger.debug("Existence of global.ClassesList Spec... OK");
    });
  
    it("Existence of global.PackagesNameList Spec", function () {
        let packagesNameList:any[] = global.PackagesNameList;
        expect(__getType__(packagesNameList)).toBe("Array");
  
        logger.debug("Existence of global.PackagesNameList Spec... OK");
    });


    it("Existence of global.ClassesNameList Spec", function () {
        let classesNameList = global.ClassesNameList;
        expect(__getType__(classesNameList)).toBe("Array");
  
        logger.debug("Existence of global.ClassesNameList Spec... OK");
    });
    
  });
  