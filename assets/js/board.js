const LINE_COLOR = "rgb(202,202,202)";
const LINE_WIDTH = 0.4;

export default class Board {
  constructor(width, height, cellSize, ctx) {
    this._width = width;
    this._height = height;
    this._cellSize = cellSize;
    this.ctx = ctx;
    this._coords = {
      x: [],
      y: []
    };

    this.setCoords();
  }

  setCoords() {
    for (let i = 0; i < this._width; i++) {
      if (i % this._cellSize === 0) this._coords.x.push(i);
    }
    for (let i = 0; i < this._height; i++) {
      if (i % this._cellSize === 0) this._coords.y.push(i);
    }
  }

  getCoords() {
    return this._coords;
  }

  getHeight() {
    return this._height;
  }

  getWidth() {
    return this._width;
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
