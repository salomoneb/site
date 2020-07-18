import Board from "./board.js";
import Circle from "./circle.js";

const button = document.querySelector(".stop");

const MAX_CIRCLE_RADIUS = 45;
const MIN_TIME = 5;
const MAX_TIME = 8;
const DIRECTIONS = ["up", "down", "left", "right"];

let width = window.innerWidth;
let height = window.innerHeight;

// Loop vars
let frame;
let distance;
let speed;
let points;
let clonedPoints;
let circle;
let startTs;

const board = new Board(width, height);
// board.mount();
board.draw();
loop(board);

button.addEventListener("click", () => {
  cancelAnimationFrame(frame);
});

function loop(board) {
  let hue = Math.ceil(Math.random() * 360);
  let color = `hsl(${hue}, 80%, 65%)`;
  let radius = Math.floor(Math.random() * MAX_CIRCLE_RADIUS);
  circle = new Circle(color, radius);

  // Movement
  let direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  points = getPathCoords(direction, board.coords);
  clonedPoints = { start: [...points.start], key: points.key };

  let { start, end, key } = points;
  distance = (end[key] - start[key]) * devicePixelRatio;
  speed = distance / MIN_TIME;

  frame = requestAnimationFrame((ts) => {
    startTs = ts;
    tick(ts);
  });
}

function tick(now) {
  let elapsedSecs = (now - startTs) / 1000;
  let startingPoint = points.start[points.key];
  let currentPos = startingPoint + elapsedSecs * speed;

  clonedPoints.start[clonedPoints.key] = Math.round(
    points.start[points.key] + currentPos
  );

  let [x, y] = clonedPoints.start;
  console.log(x, y);

  circle.draw(x, y);

  if (elapsedSecs >= MIN_TIME + 0.3) {
    console.log("finished");
    loop(board);
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
