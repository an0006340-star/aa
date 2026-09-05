---
name: Gemini model availability
description: How to respond when a Gemini model is unavailable for new API users.
---

Use the model name returned by the live Google API error when it explicitly recommends a current replacement. Keep the model in one named configuration value so it can be updated without changing request logic.

**Why:** Model availability can vary by account and API rollout; a model that is documented or previously used may return `NOT_FOUND` for new users.

**How to apply:** If a Gemini request returns a model-availability error, do not expose the provider error to callers. Update the configured model to the provider-recommended supported model, restart the service, and retest the real request.