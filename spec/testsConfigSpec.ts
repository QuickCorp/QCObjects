#!/usr/bin/env node
/* eslint-disable no-undef */
import {CONFIG, logger} from "../src/QCObjects";

describe("qcobjects", function () {
  logger.debugEnabled=true;
  logger.infoEnabled=true;
  logger.warnEnabled=true;

  beforeEach(function() {
    // Clear any existing config before each test
    CONFIG.set("testKey", undefined);
  });

  it("Basic Config instance Test Spec", function () {
    logger.debug("starting basic Config instance Test Spec... ");
    CONFIG.set("one", 1);
    var value = CONFIG.get("one");
    expect(value).toEqual(1);
    logger.debug("basic Config instance Test Spec... OK");
  });

  it("Should handle different value types correctly", function() {
    // Test string
    CONFIG.set("stringValue", "hello");
    expect(CONFIG.get("stringValue")).toEqual("hello");

    // Test number
    CONFIG.set("numberValue", 42);
    expect(CONFIG.get("numberValue")).toEqual(42);

    // Test boolean
    CONFIG.set("booleanValue", true);
    expect(CONFIG.get("booleanValue")).toEqual(true);

    // Test array
    const testArray = [1, "two", { three: 3 }];
    CONFIG.set("arrayValue", testArray);
    expect(CONFIG.get("arrayValue")).toEqual(testArray);

    // Test object
    const testObject = { name: "test", value: 123, nested: { key: "value" } };
    CONFIG.set("objectValue", testObject);
    expect(CONFIG.get("objectValue")).toEqual(testObject);

    // Test null
    CONFIG.set("nullValue", null);
    expect(CONFIG.get("nullValue")).toBeNull();
  });

  it("Should handle default values correctly", function() {
    // Test with non-existent key
    expect(CONFIG.get("nonexistent", "default")).toEqual("default");
    
    // Test with different default value types
    expect(CONFIG.get("nonexistent", 42)).toEqual(42);
    expect(CONFIG.get("nonexistent", { default: true })).toEqual({ default: true });
    expect(CONFIG.get("nonexistent", [1, 2, 3])).toEqual([1, 2, 3]);
    
    // Test with undefined default
    expect(CONFIG.get("nonexistent")).toBeUndefined();
  });

  it("Should persist values between gets", function() {
    const complexValue = {
      string: "test",
      number: 123,
      bool: true,
      array: [1, 2, 3],
      nested: { key: "value" }
    };
    
    CONFIG.set("complex", complexValue);
    
    // First get
    const firstGet = CONFIG.get("complex");
    expect(firstGet).toEqual(complexValue);
    
    // Second get should return same value
    const secondGet = CONFIG.get("complex");
    expect(secondGet).toEqual(complexValue);
    expect(secondGet).toEqual(firstGet);
  });

  it("Should handle value updates correctly", function() {
    // Set initial value
    CONFIG.set("updateTest", "initial");
    expect(CONFIG.get("updateTest")).toEqual("initial");
    
    // Update value
    CONFIG.set("updateTest", "updated");
    expect(CONFIG.get("updateTest")).toEqual("updated");
    
    // Update with different type
    CONFIG.set("updateTest", 123);
    expect(CONFIG.get("updateTest")).toEqual(123);
  });

  it("Extended Config instance Test Spec", function () {
    logger.debug("starting extended Config instance Test Spec... ");
    CONFIG.set("useConfigService", false);
    CONFIG.set("routingWay","hash");
    CONFIG.set("useSDK",true);
    CONFIG.set("useLocalSDK",false);
    CONFIG.set("tplextension","tpl.html");
    CONFIG.set("asynchronousImportsLoad",true);
    CONFIG.set("serviceWorkerURI","/sw.js");

    CONFIG.set("customSetting", "customValue");
    expect(CONFIG.get("customSetting")).toEqual("customValue");
    logger.debug("extended Config instance Test Spec... OK");
  });
});
