#!/usr/bin/env node
/* eslint-disable no-undef */
import {Class, ClassFactory, Export, logger, Package, __make_global__, _top, _QC_PACKAGES, _QC_CLASSES, global} from "./../src/QCObjects";

describe("Global Features Spec", function () {
    logger.debugEnabled=true;
    logger.infoEnabled=true;
    logger.warnEnabled=true;
  
    it("Class Factory using Class Function, no parent class Spec",  () => {
        var MyClass = Class ("MyClass", {});


        expect(ClassFactory("MyClass")).toBe( MyClass );
        logger.debug("Class Factory using Class Function, no parent class Spec... OK");
    });

    it("Global Class Factory using Class Function, no parent class Spec", () => {
        var classFactory = Class ("MyClass", {});
        Package("com.qcobjects", [classFactory]);

        expect((global as any).MyClass).toBe( classFactory );
        logger.debug("Global Class Factory using Class Function, no parent class Spec... OK");
    });

    it("Class Factory inside a package, no parent class Spec",  () => {
        Package("com.qcobjects.tests",[
            Class("MyClass",{
                propertyName1:"propertyValue1",
            })
        ]);
        var classFactory = ClassFactory("com.qcobjects.tests.MyClass");

        expect(ClassFactory("MyClass")).toBe( classFactory );
        logger.debug("Class Factory inside a package, no parent class Spec... OK");
    });
    
  });
  