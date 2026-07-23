# Obsidian on Servers — Source Ledger

- **Canonical title:** Obsidian on Servers
- **Route:** `/obsidian-on-servers`
- **Research cutoff:** 2026-07-23
- **Primary subject:** Obsidian Headless and the distinction between a server-side client, Obsidian-hosted Sync infrastructure, and community self-hosted sync systems.

## Core claims

1. **Obsidian Headless is an official standalone client in open beta.**
   - It runs independently from the desktop app.
   - It requires Node.js 22 or later.
   - Its documented services are Headless Sync and Headless Publish.

2. **Headless runs on a server; it does not turn that machine into an Obsidian Sync server.**
   - Official Sync remains a hosted Obsidian service.
   - Obsidian's team documentation says there is currently no on-premises Sync server.

3. **Headless Sync supports unattended and automated workflows.**
   - One-time or continuous sync.
   - Bidirectional, pull-only, and mirror-remote modes.
   - Conflict strategy and selective-sync configuration.
   - Remote backup, agent, team-tooling, and automation use cases.

4. **Headless Publish supports CI and scheduled publishing.**
   - It can preview changes with `--dry-run`.
   - It can publish without interactive confirmation with `--yes`.
   - It requires an active Obsidian Publish subscription.

5. **Security claims require nuance.**
   - Headless uses the same Sync encryption and privacy protections as the desktop client.
   - Obsidian publishes hosting-region details and independent security-audit reports.
   - The Sync security documentation also discloses metadata and integrity trade-offs.
   - A decrypted server-side vault folder is readable by processes with local filesystem access.

6. **Community self-hosting is a different architecture.**
   - Representative approaches include Self-hosted LiveSync, Git, Syncthing, Nextcloud, and other file-sync or custom-server systems.
   - Reliability, mobile behavior, conflicts, authentication, upgrades, and backups become the operator's responsibility.

## Sources

1. Obsidian Headless  
   https://obsidian.md/help/headless

2. Headless Sync  
   https://obsidian.md/help/sync/headless

3. Headless Publish  
   https://obsidian.md/help/publish/headless

4. Obsidian Sync  
   https://obsidian.md/sync

5. Obsidian Sync security and privacy  
   https://obsidian.md/help/Obsidian%20Sync/Security%20and%20privacy

6. Syncing for teams  
   https://obsidian.md/help/teams/sync

7. Obsidian Sync audits by Cure53 and Trail of Bits  
   https://obsidian.md/blog/cure53-tob-sync-audits/

8. Headless Sync launch changelog  
   https://obsidian.md/changelog/2026-02-27-sync/

9. Official obsidian-headless repository  
   https://github.com/obsidianmd/obsidian-headless

10. Self-hosted LiveSync community plugin  
   https://community.obsidian.md/plugins/obsidian-livesync

## Caveats

- Obsidian Headless is in open beta at the research cutoff.
- Product pricing, storage, team limits, command options, and support status can change.
- Community self-hosted projects vary significantly in maturity and architecture.
- “Sync” should not be presented as a substitute for independent backups.
