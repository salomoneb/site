var cellHeight = 100
var cellWidth = 100
var windowWidth, 
		windowHeight,
		coords

var gridCanvas = document.querySelector("#grid")
var circleCanvas = initCircleCanvas()
var circleCtx = circleCanvas.getContext("2d")
init()
runAnimation()

window.addEventListener("resize", init)

function init() {
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight	
	;[gridCanvas, circleCanvas].forEach(canvas => {
		canvas.setAttribute("width", windowWidth)
		canvas.setAttribute("height", windowHeight)
	})
	coords = generateCoords()
	drawGrid(coords)	
}

function generateCoords() { // Create coordinate board
	coords = []
	for (let i = 0; i < windowWidth; i++) {
		if (i % cellWidth === 0) {
			coords.push({ x: i, y: 0, xt: i, yt: windowHeight, start: "y", target: windowHeight })
		}
	}
	for (let i = 0; i < windowHeight; i++) {
		if (i % cellHeight === 0) {
			coords.push({ x: 0, y: i, xt: windowWidth, yt: i, start: "x", target: windowWidth })
		}
	}
	return coords
}

function initCircleCanvas() { // Create + append circle canvas
	if (document.querySelector("#circle")) document.querySelector("#circle").remove()
	var circleCanvas = document.createElement("canvas")
	circleCanvas.setAttribute("id", "circle")
	document.querySelector("body").insertBefore(circleCanvas, document.querySelector("main"))
	return circleCanvas
}

function drawGrid(coords) {
	var ctx = gridCanvas.getContext("2d")

	ctx.lineWidth = 0.4
	ctx.strokeStyle = "rgb(202,202,202)"

	coords.forEach(coord => {
		ctx.beginPath()
		ctx.moveTo(coord.x, coord.y)
		ctx.lineTo(coord.xt, coord.yt)
		ctx.stroke()
		ctx.closePath()
	})
}

function outer() {
	var start = performance.now()
	var word = "thing"
	
	requestAnimationFrame(function(timestamp) {
		inner(timestamp, start, word)
  })
}
function inner(timestamp, start, word) {
	if (timestamp - start > 5000) {
		console.log(word)
		start = timestamp
   }
	requestAnimationFrame(function(timestamp) {
		inner(timestamp, start, word)
    })
}
function getCircleData() {
	var circleData = coords[Math.floor(Math.random() * coords.length)]
	circleData.r = Math.floor(Math.random() * (50 - 10 + 1) + 10)
	circleData.c = createColor()
	return circleData	
}

function runAnimation() {
	circleData = getCircleData()
	var start = performance.now()

	requestAnimationFrame(function(timestamp) {
		animate(timestamp, start, circleData)
  })
}
function animate(timestamp, start, circleData) {
	drawCircle(circleData)
	var delta = timestamp - start
	if (timestamp - start > 6000) {		
		start = timestamp
		if (circleData[circleData.start] < circleData.target) {
			drawCircle(circleData)
		} else {
			circleData = getCircleData()
			drawCircle(circleData)
		}		
	}
	requestAnimationFrame(function(timestamp) {
		animate(timestamp, start, circleData)
  })
}

function drawCircle(circleData) {	
	circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
	circleCtx.fillStyle = circleData.c
	circleCtx.beginPath();	
	circleCtx.arc(circleData.x, circleData.y, circleData.r, 0, 2 * Math.PI)
	circleCtx.fill();
	circleCtx.closePath();
	circleData[circleData.start]+=5	
}
