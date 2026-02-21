# Turbo Wreck

Top-down 2D survival driving game. Single HTML file, no dependencies, no build step.

## Play

Open `index.html` in a browser and click Start.

## Controls

- **W / Arrow Up** — Accelerate
- **S / Arrow Down** — Brake / Reverse
- **A / Arrow Left** — Steer left
- **D / Arrow Right** — Steer right
- **Space** — Shoot
- **Escape** — Pause / Resume
- **K** — Self-destruct (testing)

## Features

- Tank steering with car selection (Sedan, Truck, Buggy, SUV) and color picker
- Infinite procedural world using chunk-based simplex noise terrain
- Multi-layer biome generation: elevation, moisture, and detail noise create large coherent regions with organic boundaries
- 5 terrain types (Grass, Dirt, Gravel, Mud, Dry Earth) each with unique speed modifiers
- Per-tile color jitter for natural visual texture
- 3 enemy types (Shambler, Runner, Brute) with scaling spawn rates
- Pause and save/resume via localStorage — close the tab and pick up where you left off
- Fixed-timestep game loop with smooth camera follow
- HUD with health bar, score, kill counter, and survival timer

## Tech

- Vanilla ES6+ JavaScript
- Canvas 2D rendering
- DOM overlays for UI (menu, HUD, game-over screen)
- Deterministic simplex noise for seamless infinite terrain
