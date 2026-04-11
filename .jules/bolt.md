
## 2024-06-25 - Scroll Event Throttling
**Learning:** In Next.js/React applications with smooth scrolling (like Lenis), attaching un-throttled scroll event listeners that update React state (e.g., for navbar transparency or sticky elements) causes significant layout thrashing and main-thread blocking.
**Action:** Always wrap state updates inside scroll handlers with `window.requestAnimationFrame`, manage a `ticking` flag to prevent queuing multiple frames, and ensure the event listener uses `{ passive: true }` to unblock the compositor thread. Explicitly call `window.cancelAnimationFrame` in the cleanup function.
