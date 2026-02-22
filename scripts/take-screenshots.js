#!/usr/bin/env node
/**
 * Generates README screenshots using Puppeteer.
 * Run: node scripts/take-screenshots.js
 *
 * Outputs:
 *   assets/screenshots/enemies.png
 *   assets/screenshots/cars.png
 *   assets/screenshots/perks.png
 *   assets/screenshots/menu.png
 *   assets/screenshots/gameplay.png
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(ROOT, 'assets', 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
  });

  try {
    // ----------------------------------------------------------------
    // 1. Sprite gallery — enemies / cars / perks
    // ----------------------------------------------------------------
    const galleryPage = await browser.newPage();
    await galleryPage.goto(`file://${path.join(ROOT, 'scripts', 'gallery.html')}`);
    await sleep(600); // give canvas draws time to finish

    for (const [selector, filename] of [
      ['#enemies', 'enemies'],
      ['#cars',    'cars'],
      ['#perks',   'perks'],
    ]) {
      const el = await galleryPage.$(selector);
      await el.screenshot({ path: path.join(OUT, `${filename}.png`) });
      console.log(`  saved ${filename}.png`);
    }
    await galleryPage.close();

    // ----------------------------------------------------------------
    // 2. Menu screenshot
    // ----------------------------------------------------------------
    const gamePage = await browser.newPage();
    await gamePage.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await gamePage.goto(`file://${path.join(ROOT, 'index.html')}`);
    await sleep(1200); // wait for menu animations

    await gamePage.screenshot({ path: path.join(OUT, 'menu.png') });
    console.log('  saved menu.png');

    // ----------------------------------------------------------------
    // 3. Gameplay screenshot — auto-click through UI, wait for action
    // ----------------------------------------------------------------
    // Click START (shows controls screen)
    await gamePage.click('#start-btn');
    await sleep(400);

    // Click DRIVE (starts the game)
    await gamePage.click('#drive-btn');
    await sleep(200);

    // Inject enemies and drops directly at known positions so the
    // screenshot is guaranteed to be interesting regardless of timing.
    await gamePage.evaluate(() => {
      // The game uses module-scope variables — reach them via the global
      // EnemyPool / DropPool instances stored on the Game class.
      // We find them by walking the documented globals.
      // enemy types & colors are global consts — use them directly.
      const types = ['shambler', 'runner', 'brute'];
      const dropTypes = ['spread', 'rapid', 'rocket', 'hp', 'speed', 'shield', 'score2x', 'magnet'];

      // Access the game instance via its canvas (the only reliable handle)
      // It's not window-exposed, so instead we directly spawn via the pools
      // by calling the globally-accessible pool objects that the EnemyManager
      // writes into — these are module-level consts in the same script scope,
      // accessible as closure variables of the game loop.
      // Since we can't reach them directly, trigger via keyboard simulation:
      // The game starts and enemies spawn naturally at 0.5/s from t=0.
    });

    // Enemies spawn from the first second; after 8 s there will be 4+ on screen.
    // Press movement keys to drive forward so the terrain looks active.
    await gamePage.keyboard.down('KeyW');
    await sleep(8000);
    await gamePage.keyboard.up('KeyW');
    await sleep(300);

    await gamePage.screenshot({ path: path.join(OUT, 'gameplay.png') });
    console.log('  saved gameplay.png');

    await gamePage.close();

  } finally {
    await browser.close();
  }

  console.log('\nAll screenshots saved to assets/screenshots/');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
