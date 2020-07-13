export default class Circle {
  constructor(color, radius) {
    this.color = color;
    this.radius = radius;
  }

  draw(x, y) {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
