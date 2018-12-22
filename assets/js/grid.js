var cellHeight = 100
var cellWidth = 100
var windowWidth = window.innerWidth
var windowHeight = window.innerHeight
var coords
var gridCanvas = document.querySelector("#grid")
var circleCanvas = initCircleCanvas()

init()

window.addEventListener("resize", function() {
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight	
	init()
})

function init() {	
	[gridCanvas, circleCanvas].forEach(canvas => {
		canvas.setAttribute("width", windowWidth)
		canvas.setAttribute("height", windowHeight)
	})
	coords = generateCoords(windowWidth, windowHeight)
	drawGrid(coords)
}

function generateCoords() { // Create coordinate board
	var coords = []
	for (let i = 0; i < windowWidth; i++) {
		if (i % cellWidth === 0) {
			coords.push({ x: i, y: 0, xt: i, yt: windowHeight, d: "vertical" })
		}
	}
	for (let i = 0; i < windowHeight; i++) {
		if (i % cellHeight === 0) {
			coords.push({ x: 0, y: i, xt: windowWidth, yt: i, d: "horizontal" })
		}
	}
	console.log(coords)
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


var target = window.innerWidth

function animate(start, target, ctx, canvas) {
	if (start < target) {
		requestAnimationFrame(animate)
		drawCircle(start,y,50,ctx,canvas)
		start++
		console.log("going")
	}	
}






// var circleCtx = circleCanvas.getContext("2d")
// test()
	// var start = 100
	// var end = window.innerWidth	+ cellWidth

// test()
function test() {
	if (start < end) {		
		circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
		circleCtx.fillStyle = "rgba(0, 255, 255, 0.4)";
		circleCtx.beginPath();	
		circleCtx.arc(start, 200, 50, 0, 2 * Math.PI)
		circleCtx.fill();
		circleCtx.closePath();
		start+=8
		console.log(start)	
		requestAnimationFrame(test)
	}
}

function drawCircle(x) {	
	console.log(x)
	circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
	circleCtx.fillStyle = "blue";
	circleCtx.beginPath();	
	circleCtx.arc(x, 200, 50, 0, 2 * Math.PI)
	circleCtx.fill();
	circleCtx.closePath();	
	console.log(x)
}

// function animate(x,y,r,target,ctx, canvas, callback) {
// 	var xPos = x
// 	var yPos = y
// 	var radius = r
// 	var target = target
// 	var canvas = canvas
// 	var callback = callback

// 	function callback() {
// 			ctx.clearRect(0, 0, canvas.width, canvas.height)
// 			console.log(xPos, yPos)
// 			drawCircle(xPos, yPos, radius, ctx, canvas)
// 			x++
// 			// requestAnimationFrame(function() {
// 			// 	animate(xPos,yPos,radius,target,ctx, canvas, callback)
// 			// })
// 			return
// 	}	
// 	if (x < target) {	
// 		return callback()
// 	}
// 	return "blah"
// }

// var count = 1
// var end = 20
// function outer(count, end) {	
// 	if (end < 321) {
// 		increment()
//     }
	
// }


// function increment() {
// 	console.log("count is: ", count)
// 	count++
// 	if (count < end) {
// 		requestAnimationFrame(increment)
//     } else {
// 		outer(count+=200, end+=300) 
//     } 
// }
















// const viewportWidth = window.innerWidth
// const viewportHeight = window.innerHeight
// const animationDuration = 3000
// const color = createColor()

// const cellDimensions = function() {
// 	return {
// 		cellHeight: 100,
// 		cellWidth: 100
// 	}
// }

// function createGridData() {
// 	const data = []
// 	const { cellHeight, cellWidth } = cellDimensions()

// 	const rows = Math.ceil(viewportHeight / cellHeight )
// 	const columns = Math.ceil(viewportWidth / cellWidth)	

// 	let xPos = 1
// 	let yPos = 1

// 	for (let i = 0; i < rows; i++) {
// 		data.push([])
// 		for (let j = 0; j < columns; j++) {
// 			let square = {
// 				x: xPos, 
// 				y: yPos,
// 				cellWidth: cellWidth, 
// 				cellHeight: cellHeight
// 			}
// 			data[i].push(square)
// 			xPos += cellWidth
// 		}
// 		xPos = 1
// 		yPos += cellHeight
// 	}		
// 	return data
// }

// const gridData = createGridData()

// // Make the grid
// const grid = d3.select("#grid")
// 	.attr("width", `${viewportWidth}px`)
// 	.attr("height", `${viewportHeight}px`)

// // Make the rows
// const row = grid.selectAll(".row")
// 	.data(gridData)
// 	.enter().append("g")
// 	.attr("class", "row")	

// // Make the squares
// const square = row.selectAll(".square")
// 	.data(function(d) { return d })
// 	.enter().append("rect")
// 	.attr("class", "square")
// 	.attr("x", function(d) { return d.x })
// 	.attr("y", function(d) { return d.y })	
// 	.attr("width", function(d) { return d.cellWidth })
// 	.attr("height", function(d) { return d.cellHeight })
// 	.style("fill", "transparent")
// 	.style("stroke", "#eee")	

// // Get the max and min coordinate values on the board
// function getGridBoundaries(gridData) {
// 	const gridDataLength = gridData.length-1

// 	return {
// 		minX: gridData[0][0].x,
// 		minY: gridData[0][0].y,
// 		maxX: gridData[0][gridData[0].length-1].x,
// 		maxY: gridData[gridDataLength][gridData[gridDataLength].length-1].y
// 	}
// }

// const gridBoundaries = getGridBoundaries(gridData)

// function createParticleData() {
// 	// Create a filtered, flattened array of square coordinates
// 	// and reduce to a single object
// 	const filteredData = gridData.map(row => {
// 		row = row.filter(data => {
// 			return data.x === gridBoundaries.minX 
// 				|| data.x === gridBoundaries.maxX 
// 				|| data.y === gridBoundaries.minY 
// 				||  data.y === gridBoundaries.maxY
// 		})
// 		return row.map(square => {
// 			return { x: square.x, y: square.y }
// 		})
// 	})
// 	.reduce((accumulator, currentValue) => {
// 		return accumulator.concat(currentValue)
// 	})	
// 	return [filteredData[Math.floor(Math.random() * filteredData.length)]]
// }	

// // Get the key that we'll use to calculate the transform
// function getTransformKey(x,y,middle) {
// 	const keyObj = {
// 		[`${y === gridBoundaries.minY}`]: "top",
// 		[`${y === gridBoundaries.maxY}`]: "bottom",
// 		[`${x === gridBoundaries.minX && middle}`]: "middleLeft",
// 		[`${x === gridBoundaries.maxX && middle}`]: "middleRight"
// 	}	
// 	return keyObj[true]
// }

// // Return a string that we'll use to translate the shape
// function calculateTransform(x,y) {	
// 	const { cellHeight, cellWidth } = cellDimensions()
// 	const middleRow = y > gridBoundaries.minY && y < gridBoundaries.maxY
// 	let key = getTransformKey(x,y,middleRow)

// 	const boardLocations = {
// 		top: `0, ${viewportHeight + cellHeight}`, 
// 		bottom: `0, -${viewportHeight + cellHeight}`,
// 		middleLeft: `${viewportWidth + cellWidth}, 0`,
// 		middleRight: `-${viewportWidth}, 0`
// 	}

// 	return `translate(${boardLocations[key]})`
// }

// function createParticles() {
// 	const particleData = createParticleData()	
// 	const particleColor = createColor()
// 	const { cellHeight, cellWidth } = cellDimensions()

// 	const circle = grid.selectAll(".particle")
// 		.data(particleData)
// 		.enter().append("circle")
// 		.attr("cx", function(d) { return d.x })
// 		.attr("cy", function(d) { return d.y })
// 		.attr("r", getNumberInRange(5, 30))
// 		.attr("fill", particleColor)
// 		.attr("stroke", particleColor)
// 		.transition()
// 		.ease(d3.easeLinear)
// 		.attr("transform", function(d) { return calculateTransform(d.x, d.y) })		
// 		.duration(animationDuration)		
	
// 	circle.remove()	
// }

// function getNumberInRange(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1) + min);
// }

// // function runAnimation() {	
// 	let previousTime = performance.now()
	
// 	const delay = getNumberInRange(animationDuration + 2, animationDuration * 7)
	
// 	function animateParticles(currentTime) {		
// 		console.log("currentTime", currentTime, "previousTime", previousTime)
// 		const delta = currentTime - previousTime
// 		console.log("delta", delta, "delay", delay)

// 		if (delta >= delay) {
// 			console.log('%c Inside if statement ', 'background: skyblue; color: white; font-size: x-large');
// 			previousTime = currentTime
// 			createParticles()			
// 		}
// 		window.requestAnimationFrame(animateParticles)
// 	}
// 	animateParticles()
// // }
// // runAnimation()