#!/usr/bin/env node
/* eslint-disable no-undef */

describe("Global Features Spec", function () {
    require("../QCObjects");
    logger.debugEnabled=true;
    logger.infoEnabled=true;
    logger.warnEnabled=true;
  
    it("Class Factory using Class Function, no parent class Spec", function () {
        var classFactory = Class ("MyClass", {});

        expect(ClassFactory("MyClass")).toBe( classFactory );
        logger.debug("Existence of global.ClassesList Spec... OK");
    });

    it("Global Class Factory using Class Function, no parent class Spec", function () {
        var classFactory = Class ("MyClass", {});

        expect(global.MyClass).toBe( classFactory );
        logger.debug("Existence of global.ClassesList Spec... OK");
    });

    it("Class Factory inside a package, no parent class Spec", function () {
        Package("com.qcobjects.tests",[
            Class("MyClass",{
                propertyName1:"propertyValue1",
            })
        ]);
        try {
            var classFactory = ClassFactory("com.qcobjects.tests.MyClass");
        } catch (e) {
            logger.warn(e);
        }

        expect(ClassFactory("MyClass")).toBe( classFactory );
        logger.debug("Existence of global.ClassesList Spec... OK");
    });
    
  });
  