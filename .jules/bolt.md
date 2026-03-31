# Bolt Journal

## 2024-05-18 - Throttling React Scroll Listeners
**Learning:** Found that `window.addEventListener('scroll', ...)` was directly calling `setState` inside both `Navbar.tsx` and `StickyBooking.tsx` on every scroll tick. This blocks the main thread and causes excessive React re-renders.
**Action:** Always wrap state updates inside scroll event listeners with `window.requestAnimationFrame` to ensure the updates are batched and fired at most once per frame, improving UI responsiveness.
