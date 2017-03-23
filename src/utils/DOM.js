
let w = typeof window !== 'undefined' ? window : global;

/**
 * Ensures React's current call stack gets cleared before registering for
 * the next frame's render.
 * @param callback <Function>
 */
export const onNextFrame = (callback) => {
  setTimeout(function () {
    w.requestAnimationFrame && w.requestAnimationFrame(callback)
  }, 0)
};
