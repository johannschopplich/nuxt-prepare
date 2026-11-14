# Keep `server.prepare` as the Default Script Name

The default prepare script `server.prepare` reads as if it ran on the server, though every prepare script runs at build time. We keep the name anyway: the module skips a missing `server.prepare` without an error, so after a rename every project relying on the old name would silently stop running its script. A check for a leftover `server.prepare` would catch that, but every project would still have to rename its file for a cosmetic gain.
