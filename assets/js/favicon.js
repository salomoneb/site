import { randomHue } from "./color.js";

// Selectors
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let favicon = document.querySelector("link[rel='shortcut icon']");

// Canvas dimensions
const W = 150;
const H = 150;

// Size of the circle
const X = W / 2;
const Y = H / 2;
const R = W / 2;

// Time between colors
const T = 8000;

canvas.setAttribute("width", W);
canvas.setAttribute("height", H);

// Vars
let currentHue = randomHue();
let targetHue = randomHue();
let hueDifference = targetHue - currentHue;
let start;
let now;

// Minimum difference between current and target hues
const minHueDifference = 20;

animateFavicon();

/**
 * Loop
 */
function animateFavicon() {
  requestAnimationFrame((cycleStart) => {
    // If the difference between the current and target hues is too small, assign a new target and check again
    if (Math.abs(hueDifference) <= minHueDifference) {
      targetHue = randomHue();
      hueDifference = targetHue - currentHue;
      animateFavicon();
      return;
    }

    start = cycleStart;
    now = cycleStart;
    step();
  });
}

/**
 * One step of the animation
 */
function step() {
  // If cycle is finished, set new current and target hues
  if (now - start >= T && Math.round(currentHue) === Math.round(targetHue)) {
    currentHue = targetHue;
    targetHue = randomHue();
    hueDifference = targetHue - currentHue;
    animateFavicon();
    return;
  }

  draw(currentHue);

  let stepAmount = hueDifference / ((T / 1000) * 60);
  currentHue += stepAmount;

  return requestAnimationFrame((ts) => {
    now = ts;
    step();
  });
}

/**
 * Draw the circle
 * @param {Number} hue
 */
function draw(hue) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = `hsl(${hue}, 80%, 65%)`;
  ctx.beginPath();
  ctx.arc(X, Y, R, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  let url = canvas.toDataURL();
  favicon.href = url;
}
