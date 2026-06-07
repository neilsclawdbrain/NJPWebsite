# drneilpatelmd.com auth.md

This document describes agent authentication for https://www.drneilpatelmd.com per the [Auth.md standard](https://workos.com/auth-md).

## Summary

This site is a public, read-only informational resource about concussion and sports neurology. **All content is available anonymously — no registration, credentials, or access tokens are required.**

## Agent audience

AI agents retrieving health-education content (articles, protocols, recovery timelines) on behalf of users.

## Registration

No registration is required or available. There is no agent-specific provisioning endpoint because there are no protected resources.

## Supported methods

- **Anonymous access** — issue standard HTTP GET requests. No `Authorization` header is needed.

## Credential use

Not applicable. If a request returns 401/403, it is an error — no credential will resolve it; retry without credentials or contact the site owner.

## Discovery metadata

- OAuth Protected Resource Metadata: `/.well-known/oauth-protected-resource` (declares zero scopes — nothing is protected)
- Authorization Server Metadata: `/.well-known/oauth-authorization-server`
- Machine-readable resources: `/.well-known/api-catalog`, `/.well-known/agent-skills/index.json`, `/sitemap.xml`
