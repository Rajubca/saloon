## 2024-05-24 - [Security Enhancement] Added Security Headers
**Vulnerability:** Missing HTTP Security Headers
**Learning:** Next.js applications require explicit configuration in `next.config.ts` to include standard security headers like Strict-Transport-Security, X-Frame-Options, and X-Content-Type-Options. Without these, the frontend is vulnerable to clickjacking and MIME-sniffing.
**Prevention:** Always include a `headers()` function in `next.config.ts` that applies standard security headers to all routes `/(.*)` by default.
