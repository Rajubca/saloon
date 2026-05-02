
## 2024-03-22 - Throttling React Scroll Events
**Learning:** React state updates inside synchronous `window.addEventListener('scroll')` handlers cause excessive layout thrashing and re-renders, especially when DOM read operations are involved (`offsetHeight`, `scrollHeight`).
**Action:** Always wrap scroll-triggered state updates in `requestAnimationFrame` and ensure the event listener uses `{ passive: true }` to avoid blocking the main thread. Always call `cancelAnimationFrame` on component unmount.
