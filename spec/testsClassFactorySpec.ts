#!/usr/bin/env node
/* eslint-disable no-undef */
import {Class, ClassFactory, Export, logger, Package, __make_global__, _top, _QC_PACKAGES, _QC_CLASSES, global} from "./../src/QCObjects";

describe("qcobjects", function () {
    logger.debugEnabled=true;
    logger.infoEnabled=true;
    logger.warnEnabled=true;
  
    it("Class Factory using Class Function, no parent class Spec",  () => {
        const MyClass = Class ("MyClass", class {}, {});


        expect(ClassFactory("MyClass")).toBe( MyClass );
        logger.debug("Class Factory using Class Function, no parent class Spec... OK");
    });

    it("Global Class Factory using Class Function, no parent class Spec", () => {
        const classFactory = Class ("MyClass", class {}, {});
        Package("com.qcobjects", [classFactory]);

        expect((global as any).MyClass).toBe( classFactory );
        logger.debug("Global Class Factory using Class Function, no parent class Spec... OK");
    });

    it("Class Factory inside a package, no parent class Spec",  () => {
        Package("com.qcobjects.tests",[
            Class("MyNewClass",class {},{
                propertyName1:"propertyValue1",
            })
        ]);
        const classFactory = ClassFactory("com.qcobjects.tests.MyNewClass");

        expect(ClassFactory("MyNewClass")).toBe( classFactory );
        logger.debug("Class Factory inside a package, no parent class Spec... OK");
    });
    
  });
  