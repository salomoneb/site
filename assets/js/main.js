import Board from "./Board.js";
import { animate, cancelFrame } from "./animation.js";

const CANVAS = document.querySelector("#grid");
const CTX = CANVAS.getContext("2d");

CANVAS.setAttribute("width", window.innerWidth);
CANVAS.setAttribute("height", window.innerHeight);
let board = new Board(window.innerWidth, window.innerHeight, CTX);

setTimeout(() => {
  animate(board);
}, 2000);

// window.addEventListener("resize", () => {
//   CTX.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   CANVAS.setAttribute("width", window.innerWidth);
//   CANVAS.setAttribute("height", window.innerHeight);
//   console.log("context is ", CTX);
//   let board = new Board(window.innerWidth, window.innerHeight, CTX);
//   animate(board);
// });
