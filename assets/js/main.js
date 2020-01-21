import Board from "./Board.js";
import { initBoard, run, cancelFrame } from "./animation.js";

const CANVAS = document.querySelector("#grid");
const CTX = CANVAS.getContext("2d");

window.addEventListener("load", () => {
  initCanvas();
  const board = initBoard();
  run(board);
});

function initCanvas() {
  CANVAS.setAttribute("width", window.innerWidth);
  CANVAS.setAttribute("height", window.innerHeight);
}
