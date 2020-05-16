import Board from "./Board.js";
import Circle from "./Circle.js";
import { createColor } from "./color.js";

let CANVAS = document.querySelector("canvas");

if (!CANVAS) {
  CANVAS = document.createElement("canvas");
  document.body.appendChild(CANVAS);
}

export const CTX = CANVAS.getContext("2d");
const DIRECTIONS = ["up", "down", "left", "right"];
const DELAY = 3000;
const VELOCITY = 5;

let board;
let circle;
let currentPos;
let end;
let translationKey;
let direction;
let tripCompleted;
export let frame;

/**
 * Initialize the grid
 */
export function initBoard() {
  CANVAS.setAttribute("width", window.innerWidth);
  CANVAS.setAttribute("height", window.innerHeight);

  board = new Board(window.innerWidth, window.innerHeight, CTX);
}

/**
 * Start the animation
 */
export function animate() {
  let radius = Math.floor(Math.random() * 45);
  let color = createColor();
  circle = new Circle(radius, color, CTX);

  direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  tripCompleted = false;

  let translations = getTranslation(board, direction);
  currentPos = translations.start;
  end = translations.end;
  translationKey = translations.translationKey;

  frame = requestAnimationFrame(tick);
}

/**
 * Do something each frame
 */
function tick() {
  if (tripCompleted) {
    CTX.clearRect(0, 0, board.width, board.height);
    board.draw();
    let startTs = performance.now();
    delay(startTs, animate);
    return;
  }

  render();
}

/**
 * Move the circle and update the state
 */
function render() {
  frame = requestAnimationFrame(() => {
    CTX.clearRect(0, 0, board.width, board.height);
    board.draw();
    circle.setCurrentPosition(currentPos);
    circle.draw();

    // The translationKey gives us the coordinate that's being translated
    if (currentPos[translationKey] < end[translationKey]) {
      currentPos[translationKey] += VELOCITY;
      if (currentPos[translationKey] >= end[translationKey]) {
        tripCompleted = true;
      }
    }

    if (currentPos[translationKey] > end[translationKey]) {
      currentPos[translationKey] -= VELOCITY;

      if (currentPos[translationKey] <= end[translationKey]) {
        tripCompleted = true;
      }
    }

    tick();
  });
}

/**
 * An implementation of setTimeout using RAF
 * @param {Number} startTs
 * @param {Function} cb
 */
export function delay(startTs, cb) {
  frame = requestAnimationFrame((ts) => {
    if (ts - startTs >= DELAY) {
      cb();
      return;
    }
    delay(startTs, cb);
  });
}

/**
 * Get the start and end coordinates for each animation cycle, and how the circle should move
 * @param {Object} board
 * @param {String} direction
 * @returns {Object}
 */
function getTranslation(board, direction) {
  const { coords, width, height, cellSize } = board;
  const randX = coords.x[Math.floor(Math.random() * coords.x.length)];
  const randY = coords.y[Math.floor(Math.random() * coords.y.length)];

  // Add extra spacing to start and end points so that circle continues offscreen
  const translations = {
    up: {
      start: [randX, height + cellSize],
      end: [randX, 0 - cellSize],
      translationKey: 1,
    },
    down: {
      start: [randX, 0 - cellSize],
      end: [randX, height + cellSize],
      translationKey: 1,
    },
    left: {
      start: [width + cellSize, randY],
      end: [0 - cellSize, randY],
      translationKey: 0,
    },
    right: {
      start: [0 - cellSize, randY],
      end: [width + cellSize, randY],
      translationKey: 0,
    },
  };
  return translations[direction];
}

/**
 * Cancel the frame
 */
export function cancelFrame() {
  cancelAnimationFrame(frame);
}
