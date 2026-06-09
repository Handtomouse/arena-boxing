import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

function read(path) {
  return readFileSync(new URL(path, root), "utf8");
}

test("home page mounts the first-visit intro gate before homepage content", () => {
  const page = read("app/page.tsx");

  assert.match(page, /IntroGate/);
  assert.match(page, /<IntroGate>/);
  assert.match(page, /<\/IntroGate>/);
});

test("/enter exists as a direct route for the Arena intro", () => {
  assert.equal(existsSync(new URL("app/enter/page.tsx", root)), true);

  const page = read("app/enter/page.tsx");
  assert.match(page, /LandingMockG/);
  assert.match(page, /mode="route"/);
  assert.match(page, /exitHref="\/"/);
});

test("LandingMockG can be used as a gate without redirecting to the removed /home route", () => {
  const component = read("components/LandingMockG.tsx");

  assert.match(component, /onComplete/);
  assert.match(component, /exitHref/);
  assert.match(component, /\.lmg-stage\{[^}]*z-index:1000/);
  assert.doesNotMatch(component, /router\.push\('\/home'\)/);
  assert.doesNotMatch(component, /router\.push\("\/home"\)/);
});
