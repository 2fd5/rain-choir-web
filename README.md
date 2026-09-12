# Rain Choir

[Play in your browser](https://2fd5.github.io/rain-choir-web/).

Tilt a mushroom canopy to guide rain into every root. Three short, single-player scenes with original procedural art and synthesized sound, by Fungalware.

Click **Play Rain Choir**, then click the caps or use **A / S / D** to tilt them. **Space** releases a drop; in scene 3 it starts a finite rainstorm. **P** pauses, **R** retries, **H** opens help, **M** toggles sound, **1–3** selects a scene, and **Enter** advances after a win. There are buttons below the game too. Returning from another tab leaves the game paused: press **P** or **Resume**.

Best with a desktop keyboard or mouse. Mobile and Safari compatibility are still playtest questions. There is no account, telemetry, multiplayer, persistence or backend. Refreshing starts over. JavaScript and WebAssembly are required. Audio starts after Play; browser/device audio settings can still mute it.

This repository contains the standalone browser build, compiled from the same C/SDL2 rules as the native prototype using Emscripten 6.0.9. It is a small public playtest, not the complete game collection or its private development history. The files are served directly by GitHub Pages. `build.json` records compiler information and file checksums.

Game source, art and sound have no general reuse licence granted here. Third-party runtime notices are in [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt).

If reporting a problem, please include your browser, device, scene and what happened. The useful playtest question: **Can you predict where a drop will land, and is switching the canopy enjoyable?**
