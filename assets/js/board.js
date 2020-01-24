const LINE_COLOR = "rgb(202,202,202)";
const LINE_WIDTH = 0.4;
const MIN_CELL_SIZE = 25;

export default class Board {
  constructor(width, height, ctx) {
    this._width = width;
    this._height = height;
    this._cellSize = Math.floor(Math.random() * 100 + MIN_CELL_SIZE);
    this.ctx = ctx;
    this._coords = {
      x: [],
      y: []
    };

    this.setCoords();
    this.draw();
  }

  setCoords() {
    for (let i = 0; i < this._width; i++) {
      if (i % this._cellSize === 0) this._coords.x.push(i);
    }
    for (let i = 0; i < this._height; i++) {
      if (i % this._cellSize === 0) this._coords.y.push(i);
    }
  }

  get coords() {
    return this._coords;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get cellSize() {
    return this._cellSize;
  }

  draw() {
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = LINE_COLOR;

    // Vertical lines
    this._coords.x.forEach(xCoord => {
      this.ctx.beginPath();
      this.ctx.moveTo(xCoord, 0);
      this.ctx.lineTo(xCoord, this._height);
      this.ctx.stroke();
      this.ctx.closePath();
    });

    // Horizontal lines
    this._coords.y.forEach(yCoord => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, yCoord);
      this.ctx.lineTo(this._width, yCoord);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}
