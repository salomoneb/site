const commonCellDimension = Math.floor(Math.random() * 100 + 25)
const cellHeight = commonCellDimension
const cellWidth = commonCellDimension
let windowWidth, 
		windowHeight,
		coords
const gridCanvas = document.querySelector("#grid")
const circleCanvas = initCircleCanvas()
const circleCtx = circleCanvas.getContext("2d")

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

function generateCoords() { // Create grid coordinates
	coords = []
	for (let i = 0; i < windowWidth; i++) {
		if (i % cellWidth === 0) {
			coords.push({ x: i, y: 0, xt: i, yt: windowHeight, startKey: "y", target: windowHeight })
		}
	}
	for (let i = 0; i < windowHeight; i++) {
		if (i % cellHeight === 0) {
			coords.push({ x: 0, y: i, xt: windowWidth, yt: i, startKey: "x", target: windowWidth })
		}
	}
	return coords
}

function initCircleCanvas() { // Create and append circle canvas
	if (document.querySelector("#circle")) document.querySelector("#circle").remove()
	const circleCanvas = document.createElement("canvas")
	circleCanvas.setAttribute("id", "circle")
	document.querySelector("body").appendChild(circleCanvas)
	return circleCanvas
}

function drawGrid(coords) { // Draw the board
	const ctx = gridCanvas.getContext("2d")
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

function getCircleData() {	// Transform circle data and randomize start and end points
	let circleData = {...coords[Math.floor(Math.random() * coords.length)]} // Shallow clone our data
	let startEndPoints = [circleData["startKey"], circleData["startKey"] + "t"]
	let randStartPointIndex = Math.floor(Math.random() * startEndPoints.length)
	let startPointKey = startEndPoints.splice(randStartPointIndex, 1)
	circleData = {
		...circleData,
		[circleData["startKey"]]: circleData[startPointKey],
		[circleData["startKey"] + "t"]: circleData[startEndPoints[0]],
		target: circleData[startEndPoints[0]],
		frozenStart: circleData[startPointKey], 
		r: Math.floor(Math.random() * (40 - 5) + 10),
		c: createColor()
	}	
	return circleData	
}

function runAnimation() {
	circleData = getCircleData()
	let start = performance.now()
	let translateDiff
	requestAnimationFrame(function(timestamp) {
		animate(timestamp, start, circleData, translateDiff)
  })
}

function animate(timestamp, start, circleData, translateDiff) {
	drawCircle(circleData)
	let delta = timestamp - start
	if (delta > 6000) {
		start = timestamp	
		circleData = getCircleData()
	}
	requestAnimationFrame(function(timestamp) {
		animate(timestamp, start, circleData, translateDiff)
  })
}

function drawCircle(circleData) { // Draw the circle
	translateDiff = circleData.target - circleData.frozenStart 
	circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
	circleCtx.fillStyle = circleData.c
	circleCtx.beginPath()
	circleCtx.arc(circleData.x, circleData.y, circleData.r, 0, 2 * Math.PI)
	circleCtx.fill()
	circleCtx.closePath()	
	translateDiff > 0 ? circleData[circleData.startKey]+=5 : circleData[circleData.startKey]-=5
}
