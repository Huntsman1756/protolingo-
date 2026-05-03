# Version

**1.2.2**

> Canonical project version. Update this file when bumping.
> Full history in [CHANGELOG.md](../CHANGELOG.md).

## Sync rule

When bumping the version, update these three locations in sync:

| Location | What to update |
|----------|---------------|
| `specs/Version.md` | Version number above |
| `CHANGELOG.md` | New `## [X.Y.Z]` section at top |
| `frontend/src/app/(app)/layout.tsx` | `vX.Y.Z` string in sidebar (desktop + mobile) |