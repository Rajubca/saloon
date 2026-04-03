## 2024-05-24 - [Input Length Limits]
**Vulnerability:** Missing input length limits on frontend forms.
**Learning:** Adding native HTML5 validation constraints (maxLength, required, pattern) is an effective client-side defense against DoS and malformed data inputs.
**Prevention:** Always add sensible `maxLength` and type validation (e.g., regex pattern for phone numbers) to all user-facing inputs to enhance defense in depth.
