import Board from "./board.js";
import Circle from "./circle.js";

const MAX_CIRCLE_RADIUS = 45;
const MIN_TIME = 3;
const MAX_TIME = 8;
const DIRECTIONS = ["up", "down", "left", "right"];

let width = window.innerWidth;
let height = window.innerHeight;

const board = new Board(width, height);
board.mount();
board.draw();
loop(board);

function loop(board) {
  let hue = Math.ceil(Math.random() * 360);
  let color = `hsl(${hue}, 80%, 65%)`;
  let radius = Math.floor(Math.random() * MAX_CIRCLE_RADIUS);
  let points = getPoints(width, height, board.coords);
  let [start, end] = points;

  let circle = new Circle(color, radius);
  let startPoint;
  let distance;

  if (start[0] !== end[0]) {
    startPoint = start[0];
    distance = end[0] - start[0];
  } else {
    startPoint = start[1];
    distance = end[1] - start[1];
  }

  console.log(points, startPoint, distance);

  // frame = requestAnimationFrame((ts, start) => tick(ts, start, circle))
}

function tick(now, start) {
  let elapsed = now - start;
  // circle.draw(x, y)
}

function getPoints(width, height, coords) {
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

  const randX = coords.x[Math.floor(Math.random() * coords.x.length)];
  const randY = coords.y[Math.floor(Math.random() * coords.y.length)];

  switch (direction) {
    case "up":
      return [
        [randX, height],
        [randX, 0],
      ];
    case "down":
      return [
        [randX, 0],
        [randX, height],
      ];
    case "left":
      return [
        [width, randY],
        [0, randY],
      ];
    case "right":
      return [
        [0, randY],
        [width, randY],
      ];
  }
}
