import Board from "./board.js";

const width = window.innerWidth;
const height = window.innerHeight;

const board = new Board(width, height);
board.mount();
board.draw();
loop(board);

function loop(board) {
  const DIRECTIONS = ["up", "down", "left", "right"];
  //SPEED const VELOCITY = 5
  const randomDirection =
    DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length - 1)];

  const startEnd = getStartEnd(width, height, randomDirection, board.coords);
  const [current, end] = startEnd[0];
  console.log(current, end);

  const hue = Math.ceil(Math.random() * 360);
  const color = `hsl(${hue}, 80%, 65%)`;
  // const circle = new Circle(color, size)

  // let distance = startPos - endPos
  // let speed
  // let x
  // let y
  // let start

  // frame = requestAnimationFrame((ts, start) => tick(ts, start, circle))
}

function tick(now, start) {
  let elapsed = now - start;
  // circle.draw(x, y)
}

function getStartEnd(width, height, direction, coords) {
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
        [width, randY],
        [0, randY],
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

// import Board from "./Board.js";
// import Circle from "./Circle.js";
// import { createColor } from "./color.js";

// let CANVAS = document.querySelector("canvas");

// if (!CANVAS) {
//   CANVAS = document.createElement("canvas");
//   document.body.appendChild(CANVAS);
// }

// export const CTX = CANVAS.getContext("2d");
// const DIRECTIONS = ["up", "down", "left", "right"];
// const DELAY = 3000;
// const VELOCITY = 5;

// let board;
// let circle;
// let start;
// let end;

// let direction;
// let tripCompleted;
// export let frame;

// let startTs;
// let nowTs;
// let translations;
// let translationKey;
// let distance;
// let speed;
// let SECONDS = 8;
// let radius;
// let color;

// /**
//  * Initialize the grid
//  */
// export function initBoard() {
//   CANVAS.setAttribute("width", window.innerWidth);
//   CANVAS.setAttribute("height", window.innerHeight);

//   board = new Board(window.innerWidth, window.innerHeight, CTX);
// }

// /**
//  * Start the animation
//  */
// export function cycle() {
//   radius = Math.floor(Math.random() * 45);
//   color = createColor();

//   direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//   translations = getTranslation(board, direction);

//   start = translations.start;
//   end = translations.end;
//   translationKey = translations.translationKey;

//   distance = end[translationKey] - start[translationKey];
//   speed = distance / SECONDS; // 286 px per sec

//   startTs = performance.now();
//   draw(start);

//   frame = requestAnimationFrame(tick);
// }

// /**
//  * Do something each frame
//  */
// function tick(ts) {
//   nowTs = ts;
//   let elapsedTs = nowTs - startTs;

//   if (elapsedTs >= SECONDS * 1000) {
//     console.log("we're finished");
//     CTX.clearRect(0, 0, board.width, board.height);
//     // board.draw();
//     // delay(startTs, cycle);
//     cycle();
//     return;
//   }

//   let distanceTraveled = (elapsedTs * speed) / 1000;
//   let translatedPosition = distanceTraveled;
//   let currentPosition = [...start];
//   currentPosition[translationKey] = Math.round(
//     start[translationKey] + translatedPosition
//   );
//   console.log(
//     `
//   The start is ${start}\n
//   The end is ${end}\n
//   Start with translation key is ${start[translationKey]}\n
//   On this frame our current translated position should be ${translatedPosition}
//   Each second we should be traveling ${speed}\n
//   Right now, our position is ${currentPosition}
//       `
//   );

//   draw(currentPosition);

//   frame = requestAnimationFrame(tick);
// }

// /**
//  * Move the circle and update the state
//  */
// function draw(currentPosition) {
//   console.log(`Drawing at ${currentPosition}`);
//   CTX.clearRect(0, 0, board.width, board.height);

//   CTX.fillStyle = color;
//   CTX.beginPath();
//   CTX.arc(currentPosition[0], currentPosition[1], radius, 0, 2 * Math.PI);
//   CTX.fill();
//   CTX.closePath();
// }

// /**
//  * An implementation of setTimeout using RAF
//  * @param {Number} startTs
//  * @param {Function} cb
//  */
// export function delay(startTs, cb) {
//   frame = requestAnimationFrame((ts) => {
//     if (ts - startTs >= DELAY) {
//       cb();
//       return;
//     }
//     delay(startTs, cb);
//   });
// }

// /**
//  * Get the start and end coordinates for each animation cycle, and how the circle should move
//  * @param {Object} board
//  * @param {String} direction
//  * @returns {Object}
//  */
// function getTranslation(board, direction) {
//   const { coords, width, height, cellSize } = board;
//   const randX = coords.x[Math.floor(Math.random() * coords.x.length)];
//   const randY = coords.y[Math.floor(Math.random() * coords.y.length)];

//   // Add extra spacing to start and end points so that circle continues offscreen
//   const translations = {
//     up: {
//       start: [randX, height],
//       end: [randX, 0],
//       translationKey: 1,
//     },
//     down: {
//       start: [randX, 0],
//       end: [randX, height],
//       translationKey: 1,
//     },
//     left: {
//       start: [width, randY],
//       end: [0, randY],
//       translationKey: 0,
//     },
//     right: {
//       start: [0, randY],
//       end: [width, randY],
//       translationKey: 0,
//     },
//   };
//   return translations[direction];
// }

// /**
//  * Cancel the frame
//  */
// export function cancelFrame() {
//   cancelAnimationFrame(frame);
// }
