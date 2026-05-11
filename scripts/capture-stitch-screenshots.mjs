/**
 * Captures reference PNGs for docs/stitch (see VISUALS_AND_SCREENSHOTS.md).
 * Prereq: `npm run build && npm run start` (default http://127.0.0.1:3000)
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "stitch", "screenshots");
const baseUrl = process.env.STITCH_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:3000";

async function ensurePlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error("Install Playwright: npm install (devDependency playwright)");
    process.exit(1);
  }
}

async function waitForHeroReady(page) {
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  // `PreHeroIntro` blocks the hero for ~1.4s min + exit animation; wait before visibility checks.
  await page.waitForTimeout(4200);
  await page
    .locator("section.hero-surface h1")
    .filter({ hasText: "We invest in" })
    .first()
    .waitFor({ state: "visible", timeout: 15_000 });
  await page.waitForTimeout(500);
}

async function assertServerReachable() {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 8000);
  try {
    const res = await fetch(baseUrl, { method: "GET", signal: ac.signal, redirect: "follow" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (e) {
    console.error(
      `Cannot reach ${baseUrl} within 8s. Run: npm run build && npm run start\n` +
        `Or set STITCH_BASE_URL (e.g. http://127.0.0.1:3002 if 3000 is busy).\n`,
      e
    );
    process.exit(1);
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  console.log(`Stitch capture → ${baseUrl}`);
  await assertServerReachable();
  console.log("Server OK, launching browser…");
  await mkdir(outDir, { recursive: true });

  const { chromium } = await ensurePlaywright();
  const browser = await chromium.launch({ headless: true });

  try {
    // Desktop
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await waitForHeroReady(desktop);
    await desktop.screenshot({ path: path.join(outDir, "01-hero-desktop.png") });

    await desktop.evaluate(() => {
      const el = document.querySelector("#positioning");
      el?.scrollIntoView({ block: "start" });
    });
    await desktop.waitForTimeout(600);
    await desktop.screenshot({ path: path.join(outDir, "02-positioning-start-desktop.png") });

    await desktop.evaluate(() => {
      window.scrollBy(0, Math.round(window.innerHeight * 1.25));
    });
    await desktop.waitForTimeout(400);
    await desktop.screenshot({ path: path.join(outDir, "03-positioning-mid-desktop.png") });

    await desktop.evaluate(() => {
      document.querySelector("#why-gaia")?.scrollIntoView({ block: "start" });
    });
    await desktop.waitForTimeout(600);
    await desktop.screenshot({ path: path.join(outDir, "04-why-gaia-desktop.png") });

    await desktop.evaluate(() => {
      document.querySelector("#contact")?.scrollIntoView({ block: "start" });
    });
    await desktop.waitForTimeout(600);
    await desktop.screenshot({ path: path.join(outDir, "05-contact-desktop.png") });

    await desktop.evaluate(() => {
      document.querySelector("footer")?.scrollIntoView({ block: "end" });
    });
    await desktop.waitForTimeout(500);
    await desktop.screenshot({ path: path.join(outDir, "06-footer-desktop.png") });
    await desktop.close();

    // Mobile
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await waitForHeroReady(mobile);
    await mobile.screenshot({ path: path.join(outDir, "07-hero-mobile.png") });

    await mobile.evaluate(() => {
      document.querySelector("#contact")?.scrollIntoView({ block: "start" });
    });
    await mobile.waitForTimeout(600);
    await mobile.screenshot({ path: path.join(outDir, "08-contact-mobile.png") });
    await mobile.close();
  } finally {
    await browser.close();
  }

  const files = [
    "01-hero-desktop.png",
    "02-positioning-start-desktop.png",
    "03-positioning-mid-desktop.png",
    "04-why-gaia-desktop.png",
    "05-contact-desktop.png",
    "06-footer-desktop.png",
    "07-hero-mobile.png",
    "08-contact-mobile.png"
  ];
  for (const f of files) {
    const s = await stat(path.join(outDir, f));
    console.log(`OK ${f} (${Math.round(s.size / 1024)} KB)`);
  }
  console.log(`\nWrote screenshots to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
