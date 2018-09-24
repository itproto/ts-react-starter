import { Before, BeforeAll } from 'cucumber';

// tslint:disable:only-arrow-functions
Before({ tags: '@ignore' }, async function() {
  return 'skipped';
});

Before({ tags: '@debug' }, async function() {
  this.debug = true;
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger' }, async function() {
  this.context = {
    ...this.context,
    foo: 'injectedProp'
  };
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger and @debug' }, async function() {
  this.context = {
    ...this.context,
    foo: 'injectedProp'
  };
});

BeforeAll(async function() {});
