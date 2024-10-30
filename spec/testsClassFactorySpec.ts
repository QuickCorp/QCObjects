#!/usr/bin/env node
/* eslint-disable no-undef */
import QCObjects from "../src/QCObjects";
const logger = QCObjects.logger;
const Class = QCObjects.Class;
const ClassFactory = QCObjects.ClassFactory;
const __getType__ = QCObjects.__getType__;
const New = QCObjects.New;
const Component = QCObjects.Component;
const Effect = QCObjects.Effect;
const _DataStringify = QCObjects._DataStringify;
const CONFIG = QCObjects.CONFIG;

describe("Global Features Spec", function () {
    logger.debugEnabled=true;
    logger.infoEnabled=true;
    logger.warnEnabled=true;
  
    it("Class Factory using Class Function, no parent class Spec", function () {
        var classFactory = Class ("MyClass", {});

        expect(ClassFactory("MyClass")).toBe( classFactory );
        logger.debug("Class Factory using Class Function, no parent class Spec... OK");
    });

    it("Global Class Factory using Class Function, no parent class Spec", function () {
        var classFactory = Class ("MyClass", {});

        expect(global.MyClass).toBe( classFactory );
        logger.debug("Global Class Factory using Class Function, no parent class Spec... OK");
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
        logger.debug("Class Factory inside a package, no parent class Spec... OK");
    });
    
  });
  