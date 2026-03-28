## 2024-05-15 - Interactive Form Feedback
**Learning:** The booking form initially lacked visual feedback during form submission, which could lead to multiple submissions or confusion for users wondering if their action succeeded. Adding an active loading state is a crucial micro-UX improvement for forms in this Next.js app.
**Action:** When creating or reviewing forms (like the booking form or future contact forms), always ensure there's a disabled `isSubmitting` state that provides visual feedback (e.g. spinner, changing text to "Confirming...") during async operations.
## 2024-05-15 - Missing form label associations
**Learning:** The booking form's label elements were not explicitly linked to their corresponding input elements via `id` and `htmlFor` attributes, which hurts accessibility and screen reader support.
**Action:** Ensure all form controls are always properly linked with their labels in future components, avoiding generic wrapper patterns without explicit IDs.
