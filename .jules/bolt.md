## 2024-05-18 - Throttling Scroll Events
**Learning:** React re-renders triggered directly by `scroll` event listeners without requestAnimationFrame cause layout thrashing and drop frames, as scroll events fire much faster than the display refresh rate.
**Action:** Always wrap state updates in scroll listeners with `requestAnimationFrame`, track the frame ID to cancel it on cleanup, and pass `{ passive: true }` to `addEventListener` to let the browser know the scroll won't be prevented, improving scrolling performance.
