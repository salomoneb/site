import Board from "./Board.js";
import Circle from "./Circle.js";
import { createColor } from "./color.js";

const CANVAS = document.querySelector("#grid");
const CTX = CANVAS.getContext("2d");
const DIRECTIONS = ["up", "down", "left", "right"];
const DELAY = 3000;
const VELOCITY = 5;
let frame; // Need this so we can cancel the animation frame

export function initBoard() {
  CANVAS.setAttribute("width", window.innerWidth);
  CANVAS.setAttribute("height", window.innerHeight);

  let board = new Board(window.innerWidth, window.innerHeight, CTX);
  board.draw();

  return board;
}

export function run(board) {
  // Create the circle
  const circle = initCircle();

  // Get the direction that it will travel
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

  // Get the start and end coordinates
  const { start, end, translationKey } = getTranslation(board, direction);

  // Define the animation state
  const state = {
    board,
    circle,
    start,
    end,
    translationKey,
    tripCompleted: false
  };

  // Kick things off
  frame = requestAnimationFrame(() => tick(state));
}

export function cancelFrame() {
  cancelAnimationFrame(frame);
}

function initCircle() {
  let color = createColor();
  let radius = Math.floor(Math.random() * 45);
  return new Circle(radius, color, CTX);
}

function tick(state) {
  const { board, circle, tripCompleted } = state;

  if (tripCompleted) {
    CTX.clearRect(0, 0, board.width, board.height);
    board.draw();
    let startTs = performance.now();
    delay(startTs, board, circle);
    return;
  }

  render(state);
}

/**
 * Draw the board and circle, advance the circle
 * @param {Object} state
 */
function render(state) {
  const { board, circle, start, end, translationKey } = state;
  frame = requestAnimationFrame(() => {
    CTX.clearRect(0, 0, board.width, board.height);
    board.draw();
    circle.draw(start);

    // The translationKey gives us the coordinate that's being translated
    if (start[translationKey] < end[translationKey]) {
      state.start[translationKey] += VELOCITY;
      if (start[translationKey] >= end[translationKey]) {
        state.tripCompleted = true;
      }
    }

    if (start[translationKey] > end[translationKey]) {
      state.start[translationKey] -= VELOCITY;

      if (start[translationKey] <= end[translationKey]) {
        state.tripCompleted = true;
      }
    }

    tick(state);
  });
}

/**
 * Delay the next circle animation
 * @param {String} startTs
 * @param {Object} board
 * @param {Object} circle
 */
function delay(startTs, board, circle) {
  frame = requestAnimationFrame(ts => {
    if (ts - startTs >= DELAY) {
      run(board);
      return;
    }
    delay(startTs, board, circle);
  });
}

/**
 * Get the start/end coordinates of the circle animation
 * and the key for the point that's being translated
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
      translationKey: 1
    },
    down: {
      start: [randX, 0 - cellSize],
      end: [randX, height + cellSize],
      translationKey: 1
    },
    left: {
      start: [width + cellSize, randY],
      end: [0 - cellSize, randY],
      translationKey: 0
    },
    right: {
      start: [0 - cellSize, randY],
      end: [width + cellSize, randY],
      translationKey: 0
    }
  };
  return translations[direction];
}
