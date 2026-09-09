import test from 'node:test';
import assert from 'node:assert/strict';
import { crossedSwipeThreshold, boundedPinchScale } from './gestureHelpers.js';
test('horizontal swipes consume the x distance, not a vector-to-number conversion', () => {
  assert.equal(crossedSwipeThreshold([80, 0], 50), true);
  assert.equal(crossedSwipeThreshold([10, 150], 50), false);
});
test('pinch offsets are already scale factors and stay within the zoom limits', () => {
  assert.equal(boundedPinchScale(2), 2);
  assert.equal(boundedPinchScale(4), 4);
  assert.equal(boundedPinchScale(8), 4);
  assert.equal(boundedPinchScale(0.1), 0.5);
});
