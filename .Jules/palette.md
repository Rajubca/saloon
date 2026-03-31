## 2024-05-24 - Missing ARIA Labels on Icon-only Modal Buttons
**Learning:** Found an accessibility issue pattern in the app where custom modal components (like the `Services.tsx` image gallery) use icon-only buttons for navigation (previous/next) and closing without `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always verify that custom interactive elements, especially those containing only SVG icons from Lucide React or similar libraries, have descriptive `aria-label` attributes attached.
