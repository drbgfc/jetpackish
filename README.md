# Jetpackish | PICO-8 Project

## Quick start

- In VS Code press `F5` (Start Debugging) or `Ctrl+F5` (Start Without Debugging). The debugger will use the configuration in `.vscode/launch.json` (the "Open index.html" config).
    - Note: All the launch configuration does is open `index.html` in your browser (Chrome), so running via F5 just opens that file. If you don't want the debugger, just open the file from the system explorer or from Chrome directly.

## About

- This is a Pico-8 project export that has been converted to JavaScript for the web.
- The distributed JS is minified for size and performance, so the JS files are not practical to edit directly.

## Editing the game

- To make changes to the game, edit the original `.p8` Pico-8 source file (the editable source). That `.p8` file is stored elsewhere for now — updates must be made there and re-exported to regenerate the web build.

## Hosting

- Play the game: https://jetpackish.danielbrown.dev
- Current hosting: GitHub Pages at http://drbgfc.github.io/jetpackish. This repository includes a `CNAME` that points the site to the custom domain `jetpackish.danielbrown.dev`.

Notes on why this is arranged:
- Historically this repo was created as a deployment-only repository (it does not contain the original `.p8` source). That was done as a workaround as GitHub Pages can't be used with private GitHub repos without additional costs or restrictions
- Cloudflare Pages however, supports deployments from private GitHub repos (with automatic CI/CD) and lets you use a custom domain. The earlier workaround is no longer strictly necessary. It's also better/faster hosting
- The `axeman` project (https://github.com/drbgfc/axeman) uses a private GitHub repo + Cloudflare Pages without this workaround; the goal is to migrate this project to the same setup in the future.
 
## Background

Jetpackish is an experimental 8‑bit Pico‑8 style prototype built for small‑scale, retro gameplay. Key facts:

- Resolution: 128×128 pixels (viewport and sprite sheet).
- Sprites/tiles: compact tiles (typically 8×8 pixels); larger sprites are used only for special cases.
- Palette: Pico‑8 16‑color palette is used (see https://www.romanzolotarev.com/pico-8-color-palette/). Black is treated as transparent in the current web build.

Current prototype behavior:
- Basic physics: gravity and velocity are implemented
- Movement and simple animations are present
- Collision handling is minimal

Purpose and next steps:
- The project uses the Pico‑8 constraints as a productivity and design aid; if the concept proves fun, assets and resolution may be expanded (for example using larger sprite sizes and higher display resolution) in future iterations

Art:
- Sprite sheets and artwork follow a simple grid layout (rows of 8×8 tiles). To propose art changes, supply images that follow the same layout and palette. For now black pixels are treated as transparent

Audio:
-Sound FX and music are generated in pico-8

## Audio workaround: fix-pico8-sound.js

Modern browsers restrict audio playback until the user interacts with the page (e.g. clicking or pressing a key). Pico-8 games expect sound to work immediately on load.

**Solution:** `fix-pico8-sound.js` is a wrapper script that displays a loading overlay and waits for the user to click or press any key. Once triggered, it initializes the browser's AudioContext (which unlocks audio) and then dynamically loads the main game script.

**Origin:** This script is heavily customized from a simpler workaround at https://github.com/nucleartide/fix-pico8-ios-sound (see code comments in the file). The customizations include:
- A custom 8‑bit themed loading screen with game title, instructions, and visual elements
- Support for both keyboard and mouse input to start
- Integration with the overlay removal and fullscreen control reveal

**Future:** A more generic, reusable version of this workaround could be extracted (for example, taking the game title and instructions as parameters) so it can be applied to any Pico‑8 web export without modification. Refer to the commit that added this documentation for the very minimal index.html changes required after porting the pico-8 code to JS to add the fix-pico8-sound.js layer.


