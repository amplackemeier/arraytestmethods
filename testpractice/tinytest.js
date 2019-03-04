/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {

  run: function(tests) {
    var failures = 0;
    for (var testName in tests) { // Iterates over all methods in tests -- testName = name of test
      var testAction = tests[testName]; // Sets var name to actual method
      try {
        testAction.apply(this); //apply binds this to TinyTest object and runs test -- different from bind bc bind only returns function
        console.log('Test:', testName, 'OK'); // Will only print out if no error
      } catch (e) {
        failures++;
        console.error('Test:', testName, 'FAILED', e);
        console.error(e.stack); //e.stack
      }
    }

    setTimeout(function() { // Give document a chance to complete
      if (window.document && document.body) {
        document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
      }
    }, 0); // set to zero to ensure setTimeout runs after DOM is updated -- important b/c this callback modifies the DOM
  },

  //BROWSER ORDER OF OPERATIONS -- in reference to setTimeout
  // 1. Javascript.
  // 2. Update the DOM
  // 3. Extra tasks (e.g. callbacks passed into setTimeout)

  fail: function(msg) {
    throw new Error('fail(): ' + msg); // new = constructor function
  },

  assert: function(value, msg) {
    if (!value) { // If value is false
      throw new Error('assert(): ' + msg);
    }
  },

  assertEquals: function(expected, actual) {
    if (expected != actual) {
      throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
    }
  },

  assertStrictEquals: function(expected, actual) {
    if (expected !== actual) {
      throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
    }
  },

};

var fail = TinyTest.fail.bind(TinyTest),
  assert = TinyTest.assert.bind(TinyTest),
  assertEquals = TinyTest.assertEquals.bind(TinyTest),
  eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests = TinyTest.run.bind(TinyTest); // runs tests in our functions