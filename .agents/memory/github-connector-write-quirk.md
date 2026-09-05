---
name: GitHub connector write behavior
description: Environment-specific limits encountered when synchronizing repositories through the connected GitHub integration.
---

The connected GitHub API can read repository data and perform small Git object writes, but large `git/trees` payloads and rapid sequences of blob writes may receive a Cloudflare 403 before the branch changes.

**Why:** The connector's proxy layer applies request filtering/rate protection that is separate from GitHub repository permissions; a successful read or small write does not guarantee a large tree write will pass.

**How to apply:** For safe repository syncs, verify the branch tip immediately before writing, keep tree payloads compact, pace or batch object writes, and update the branch once with `force: false`. Verify the resulting ref after the update.