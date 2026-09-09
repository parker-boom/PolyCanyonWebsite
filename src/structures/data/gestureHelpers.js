/** use-gesture reports drag distance as [x, y] and pinch offset as [scale, angle]. */
export const crossedSwipeThreshold = (distance, threshold) =>
  distance[0] > threshold;
export const boundedPinchScale = (scale) => Math.min(4, Math.max(0.5, scale));
