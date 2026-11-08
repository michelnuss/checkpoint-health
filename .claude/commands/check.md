Make sure the Checkpoint demo still works end to end.

1. Run `node tests/engine.test.js` and report any failure.
2. If the server isn't running on port 3000, start `node server.js` in the background.
3. Run `node tests/smoke.js` (needs ANTHROPIC_API_KEY in .env) and report each check.
4. If anything fails, explain the cause in plain words and propose the smallest fix. Don't change the rules in public/engine.js to make a test pass.
