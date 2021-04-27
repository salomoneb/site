import Board from "./Board.js";
import Circle from "./Circle.js";
import { createColor } from "./color.js";

const MAX_CIRCLE_RADIUS = 45;
const MIN_SECS = 3;
const MAX_SECS = 8;
const MIN_DELAY = 1000;
const MAX_DELAY = 3000;
const DIRECTIONS = ["up", "down", "left", "right"];

let width = window.innerWidth;
let height = window.innerHeight;

// Loop vars
let frame;
let distance;
let speed;
let points;
let start;
let clonedPoints;
let circle;
let startTs;
let randomSecs;

let board = new Board(width, height);
board.draw();

setTimeout(() => {
  loop(board);
}, MIN_DELAY);

const linkColor = createColor();
document
  .querySelectorAll("a")
  .forEach((link) => (link.style.borderColor = linkColor));

const favicon = document.querySelector("link[rel='shortcut icon']");
const faviconColor = createColor();
const faviconUrl = getFaviconUrl(faviconColor);

favicon.href = faviconUrl;

function loop(board) {
  // Create the circle
  let color = createColor();
  let radius = Math.floor(Math.random() * MAX_CIRCLE_RADIUS);
  circle = new Circle(width, height, color, radius);

  // Get the original coords and create a copy for updating
  let direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  points = getPathCoords(direction, board.coords);
  clonedPoints = { start: [...points.start], key: points.key };

  // Set movement vars
  randomSecs = getRandomSecs(MIN_SECS, MAX_SECS);
  start = points.start[points.key];
  distance = points.end[points.key] - points.start[points.key];

  // We want to make sure the circle moves fully off screen.
  // Get the diameter and tack it on to the translation.
  const diameter = radius * 2;
  distance = distance > 0 ? distance + diameter : distance - diameter;

  speed = distance / randomSecs;

  frame = requestAnimationFrame((ts) => {
    startTs = ts;
    tick(ts);
  });
}

function tick(now) {
  let elapsedSecs = (now - startTs) / 1000;

  // The amount to increment/decrement the translated point
  let translateAmount = start + elapsedSecs * speed;

  // If we're moving from a larger number to a smaller one, make the translation negative
  if (speed < 0) translateAmount *= -1;

  clonedPoints.start[clonedPoints.key] = Math.round(start + translateAmount);

  let [x, y] = clonedPoints.start;
  circle.draw(x, y);

  if (elapsedSecs >= randomSecs + 0.5) {
    setTimeout(() => {
      loop(board);
    }, getRandomSecs(MIN_DELAY, MAX_DELAY));
    return;
  }

  frame = requestAnimationFrame(tick);
}

function getPathCoords(direction, coords) {
  const randX = coords.x[Math.floor(Math.random() * coords.x.length)];
  const randY = coords.y[Math.floor(Math.random() * coords.y.length)];

  switch (direction) {
    case "up":
      return {
        start: [randX, height],
        end: [randX, 0],
        key: 1,
      };
    case "down":
      return {
        start: [randX, 0],
        end: [randX, height],
        key: 1,
      };
    case "left":
      return {
        start: [width, randY],
        end: [0, randY],
        key: 0,
      };
    case "right":
      return {
        start: [0, randY],
        end: [width, randY],
        key: 0,
      };
  }
}

function getRandomSecs(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFaviconUrl(color) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const W = 150,
    H = 150;

  const X = W / 2,
    Y = W / 2,
    R = W / 2;

  canvas.setAttribute("width", W);
  canvas.setAttribute("height", H);

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(X, Y, R, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  return canvas.toDataURL();
}
