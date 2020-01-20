console.log("hello");
import Board from "./board.js";
import Circle from "./circle.js";

const MIN_CELL_SIZE = 25;
const CANVAS = document.querySelector("#grid");
const CTX = CANVAS.getContext("2d");
const DIRECTIONS = ["up", "down", "left", "right"];
const DELAY = 3000;

function createShapes() {
  // Document setup
  let width = window.innerWidth;
  let height = window.innerHeight;
  CANVAS.setAttribute("width", width);
  CANVAS.setAttribute("height", height);

  // Board setup
  let cellSize = Math.floor(Math.random() * 100 + MIN_CELL_SIZE);
  let board = new Board(width, height, cellSize, CTX);

  // Circle setup
  let radius = Math.floor(Math.random() * 45);
  let circle = new Circle(radius, "red", CTX);

  travel(board, circle);
}

function travel(board, circle) {
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  console.log("DIRECTION", direction);
  const translation = translate(direction, board);
  console.log("TRANSLATION", translation);
  const startTs = performance.now();

  const travelPlans = {
    board: board,
    circle: circle,
    translation: translation
  };

  requestAnimationFrame(ts => tick(travelPlans, ts, startTs));
}

function tick(travelPlans, ts, startTs) {
  const { board, circle, translation } = travelPlans;
  const { from, to, translationKey } = translation;

  // Have we made it to our destination?
  let tripCompleted = from[translationKey] === to[translationKey];

  // // Handle interval
  if (tripCompleted) {
    if (ts - startTs >= DELAY) {
      travel();
    }
    requestAnimationFrame(ts => tick(translation, ts, startTs));
  }

  requestAnimationFrame(() => {
    CTX.clearRect(0, 0, board.width, board.height);
    board.draw();
    circle.draw(from);

    if (from[translationKey] < to[translationKey]) {
      from[translationKey] += 5;
    } else {
      from[translationKey] -= 5;
    }
    travelPlans.translation.from = from;
    // tick(travelPlans, ts, startTs);
  });
}

function translate(direction, board) {
  const coords = board.getCoords();

  const x = coords.x[Math.floor(Math.random() * coords.x.length)];
  const y = coords.y[Math.floor(Math.random() * coords.y.length)];
  const lastX = coords.x[coords.x.length - 1];
  const lastY = coords.y[coords.y.length - 1];

  const translations = {
    up: {
      from: [x, lastY],
      to: [x, 0],
      translationKey: 1
    },
    down: {
      from: [x, 0],
      to: [x, board.height],
      translationKey: 1
    },
    left: {
      from: [lastX, y],
      to: [0, y],
      translationKey: 0
    },
    right: {
      from: [0, y],
      to: [board.width, y],
      translationKey: 0
    }
  };
  return translations[direction];
}
