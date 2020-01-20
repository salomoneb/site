export default class Circle {
  constructor(radius, color, ctx) {
    this._radius = radius;
    this._color = color;
    this.ctx = ctx;
    this._currentPosition;
  }

  draw(coords) {
    this._currentPosition = coords;
    this.ctx.fillStyle = this._color;
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPosition[0],
      this._currentPosition[1],
      this._radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
  }
}
