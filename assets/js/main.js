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
loop(board);

document.addEventListener("click", () => {
  cancelAnimationFrame(frame);

  board.ctx.clearRect(0, 0, width, height);
  board = new Board(width, height);
  board.draw();

  loop(board);
});

function loop(board) {
  // Create the circle
  let color = createColor();
  let radius = Math.floor(Math.random() * MAX_CIRCLE_RADIUS);
  circle = new Circle(color, radius);

  // Get the original coords and create a copy for updating
  let direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  points = getPathCoords(direction, board.coords);
  clonedPoints = { start: [...points.start], key: points.key };

  // Set movement vars
  randomSecs = getRandomSecs(MIN_SECS, MAX_SECS);
  start = points.start[points.key];
  distance = points.end[points.key] - points.start[points.key];
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

  if (elapsedSecs >= randomSecs + 0.3) {
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
