## 2024-05-15 - Missing form label associations
**Learning:** The booking form's label elements were not explicitly linked to their corresponding input elements via `id` and `htmlFor` attributes, which hurts accessibility and screen reader support.
**Action:** Ensure all form controls are always properly linked with their labels in future components, avoiding generic wrapper patterns without explicit IDs.
