const LINE_COLOR = "rgb(202,202,202)";
const LINE_WIDTH = 0.4;
const MIN_CELL_SIZE = 25;
const MAX_CELL_SIZE = 100;

export default class Board {
  constructor(width, height) {
    let canvas = document.querySelector(".board");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.classList.add("board");
      document.body.appendChild(canvas);
    }

    const dpr = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");

    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.cellSize = Math.floor(Math.random() * MAX_CELL_SIZE + MIN_CELL_SIZE);
    this.canvas = canvas;
    this.coords = this.getCoords();

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.scale(dpr, dpr);
  }

  getCoords() {
    let x = [];
    let y = [];

    for (let i = 0; i < this.width; i++) {
      if (i % this.cellSize === 0) x.push(i);
    }

    for (let i = 0; i < this.height; i++) {
      if (i % this.cellSize === 0) y.push(i);
    }

    return { x, y };
  }

  mount() {
    document.body.appendChild(this.canvas);
  }

  draw() {
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = LINE_COLOR;

    // Vertical lines
    this.coords.x.forEach((coord) => {
      this.ctx.beginPath();
      this.ctx.moveTo(coord, 0);
      this.ctx.lineTo(coord, this.height);
      this.ctx.stroke();
      this.ctx.closePath();
    });

    // Horizontal lines
    this.coords.y.forEach((coord) => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, coord);
      this.ctx.lineTo(this.width, coord);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}
