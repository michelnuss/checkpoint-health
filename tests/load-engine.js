// Loads public/engine.js (the same file the browser uses) into an isolated context for tests.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

module.exports = function loadEngine() {
  const ctx = vm.createContext({ console, Date, Math, JSON });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", "engine.js"), "utf8"), ctx);
  // Helpers run inside the engine's context so they share its state (S) and functions.
  const run = code => vm.runInContext(code, ctx);
  return { ctx, run };
};
