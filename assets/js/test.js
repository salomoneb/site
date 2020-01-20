import Board from "./Board.js";
import Circle from "./Circle.js";

const CANVAS = document.querySelector("#grid");
const CTX = CANVAS.getContext("2d");
const DIRECTIONS = ["up", "down", "left", "right"];
const DELAY = 3000;
const MIN_CELL_SIZE = 25;
const VELOCITY = 5;

let frame;
let resizing = false;

document.addEventListener("click", () => {
  cancelAnimationFrame(frame);
  init();
});

window.addEventListener("resize", () => {
  cancelAnimationFrame(frame);

  if (resizing) {
    cancelAnimationFrame(resizing);
  }

  resizing = requestAnimationFrame(() => {
    init();
  });
});

init();

function init() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  CANVAS.setAttribute("width", width);
  CANVAS.setAttribute("height", height);

  let cellDimensions = Math.floor(Math.random() * 100 + MIN_CELL_SIZE);
  let board = new Board(width, height, cellDimensions, CTX);

  run(board);
}

function run(board) {
  board.draw();

  let color = createColor();
  let radius = Math.floor(Math.random() * 45);
  let circle = new Circle(radius, color, CTX);
  console.log(circle);

  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  const { coords } = board;

  // Get the start and end coordinates
  const { start, end, translationKey } = getTranslation(
    coords,
    direction,
    board.width,
    board.height
  );

  // Define the animation state
  const state = {
    board,
    circle,
    start,
    end,
    translationKey,
    tripCompleted: false
  };

  frame = requestAnimationFrame(() => tick(state));
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
 * Draw the board and circle, advance the action
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

function createColor() {
  const hue = Math.round(Math.random() * 360);
  return `hsl(${hue}, 80%, 65%)`;
}

function getTranslation(coords, direction, boardWidth, boardHeight) {
  const randX = coords.x[Math.floor(Math.random() * coords.x.length)];
  const randY = coords.y[Math.floor(Math.random() * coords.y.length)];

  // Add extra spacing to start and end points so that circle continues offscreen
  const translations = {
    up: {
      start: [randX, boardHeight + MIN_CELL_SIZE],
      end: [randX, 0 - MIN_CELL_SIZE],
      translationKey: 1
    },
    down: {
      start: [randX, 0 - MIN_CELL_SIZE],
      end: [randX, boardHeight + MIN_CELL_SIZE],
      translationKey: 1
    },
    left: {
      start: [boardWidth + MIN_CELL_SIZE, randY],
      end: [0 - MIN_CELL_SIZE, randY],
      translationKey: 0
    },
    right: {
      start: [0 - MIN_CELL_SIZE, randY],
      end: [boardWidth + MIN_CELL_SIZE, randY],
      translationKey: 0
    }
  };
  return translations[direction];
}
