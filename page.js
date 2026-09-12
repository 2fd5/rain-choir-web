"use strict";
const canvas = document.getElementById("canvas");
const play = document.getElementById("play");
const loading = document.getElementById("loading");
let game, started = false, failed = false;
function fail(message) {
  failed = true;
  loading.textContent = message + " Reload the page to try again.";
  document.querySelector(".intro").classList.remove("started");
  play.textContent = "Unable to start";
  play.disabled = true;
}
function updateStatus() {
  if (!started || failed) return;
  const scene = game._rain_web_info(0), water = game._rain_web_info(1), goal = game._rain_web_info(2);
  const state = game._rain_web_info(3), sound = game._rain_web_info(4);
  const ending = state & 4 ? (scene === 3 ? "All three scenes complete! Restart to play again." : "The roots sing! Continue to the next scene.") : state & 8 ? "The rain is gone. Try again." : state & 2 ? "Help is open. The garden is held." : state & 1 ? "Paused. Press P or Resume." : "Guide the rain to every root.";
  const status = `Scene ${scene} / 3 · Water ${water} / ${goal} · ${ending}`;
  if (document.getElementById("status").textContent !== status) document.getElementById("status").textContent = status;
  document.getElementById("pause").textContent = state & 1 ? "Resume" : "Pause";
  document.getElementById("help").textContent = state & 2 ? "Close help" : "Help";
  const next = document.getElementById("next");
  next.hidden = !!(state & 2) || !(state & 8 || (state & 4 && scene < 3));
  next.textContent = state & 8 ? "Try again" : "Next scene";
  const soundButton = document.getElementById("sound");
  soundButton.textContent = sound < 0 ? "Audio unavailable" : sound ? "Sound on" : "Sound off";
  soundButton.disabled = sound < 0 || !!(state & 2);
  soundButton.setAttribute("aria-pressed", sound === 1 ? "true" : "false");
  // Help consumes gameplay input, just as it does in the native game.
  document.querySelectorAll("[data-key]").forEach(button => {
    if (button.id !== "help" && button.id !== "sound") button.disabled = !!(state & 2);
  });
}
window.addEventListener("error", () => fail("The game encountered a browser error."));
window.addEventListener("unhandledrejection", () => fail("The game could not finish loading."));
async function prepare() {
  try {
    game = await createRainChoir({canvas, noInitialRun: true,
      print: message => console.log(message), printErr: message => console.warn(message),
      onAbort: () => fail("This browser could not run the game.")});
    if (failed) return;
    play.disabled = false;
    play.textContent = "Play Rain Choir";
    loading.textContent = "Ready. Sound starts when you play; M turns it off.";
  } catch (_) { fail("The game could not load. Check your connection and WebAssembly support."); }
}
play.addEventListener("click", () => {
  if (!game || started || failed) return;
  document.getElementById("garden").hidden = false;
  document.querySelector(".intro").classList.add("started");
  canvas.focus({preventScroll:true});
  try {
    if (game.callMain([]) !== 0) throw new Error("SDL startup failed");
    started = true;
    updateStatus();
    window.setInterval(updateStatus, 200);
  } catch (_) { fail("The garden could not start."); }
});
document.querySelectorAll("[data-key]").forEach(button => button.addEventListener("click", () => {
  if (!started || failed) return;
  game._rain_web_key(Number(button.dataset.key));
  canvas.focus({preventScroll:true});
  updateStatus();
}));
canvas.addEventListener("pointerdown", () => canvas.focus({preventScroll:true}));
canvas.addEventListener("contextmenu", event => event.preventDefault());
canvas.addEventListener("keydown", event => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) event.preventDefault();
});
function pauseAway() { if (started && !failed) { game._rain_web_pause(); updateStatus(); } }
window.addEventListener("blur", pauseAway);
document.addEventListener("visibilitychange", () => { if (document.hidden) pauseAway(); });
prepare();
