## 2025-02-14 - HTML5 Validation Requires Prevent Default
**Vulnerability:** Forms lacking backend connections were missing client-side input validation, allowing potentially unconstrained data entry.
**Learning:** When adding native HTML5 validation constraints (like `required` and `maxLength`) to forms that previously lacked them, changing the submission button from `type="button"` to `type="submit"` is required to trigger the browser's native UI tooltips. However, for client-side only forms, this change causes a full page reload upon submission.
**Prevention:** Always ensure the wrapper `<form>` element has an `onSubmit` handler that calls `e.preventDefault()` to prevent the page reload while still preserving the native browser validation experience.
