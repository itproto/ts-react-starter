import { expect } from 'chai';
import { Before, Given, Then, When } from 'cucumber';
import { SimpleMathsCalculator } from '../../src-example/simple-math-calc';

// tslint:disable:only-arrow-functions
Given('I have a simple maths calculator', async function() {
  this.calc = new SimpleMathsCalculator();
});

Given('a variable set to {int}', async function(value: number) {
  this.calc.startWith(value);
});

When('I increment the variable by {int}', async function(value: number) {
  this.calc.incrementBy(value);
});

Then('the variable should contain {int}', async function(value: number) {
  expect(this.calc.result).equals(value);
});

/**
 * Before each scenario hook
 */
Before({ tags: '@foo' }, async function() {
  this.foo = true;
});
