# DeadDrift

Top-down 2D survival driving game. Single HTML file, no dependencies, no build step.

## Play

Open `DeadDrift/index.html` in a browser and click Start.

## Controls

- **W / Arrow Up** — Accelerate
- **S / Arrow Down** — Brake / Reverse
- **A / Arrow Left** — Steer left
- **D / Arrow Right** — Steer right
- **K** — Self-destruct (testing)

## Features

- Tank steering with car selection (Sedan, Truck, Buggy, SUV) and color picker
- Infinite procedural world using chunk-based simplex noise terrain
- Multi-layer biome generation: elevation, moisture, and detail noise create large coherent regions with organic boundaries
- 5 terrain types (Grass, Dirt, Gravel, Mud, Dry Earth) each with unique speed modifiers
- Per-tile color jitter for natural visual texture
- Fixed-timestep game loop with smooth camera follow
- HUD with health bar, score, kill counter, and survival timer

## Tech

- Vanilla ES6+ JavaScript
- Canvas 2D rendering
- DOM overlays for UI (menu, HUD, game-over screen)
- Deterministic simplex noise for seamless infinite terrain
