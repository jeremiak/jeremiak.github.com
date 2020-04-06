var svg = d3.select("svg#bg")

svg
  .classed("fixed", true)
  .style("left", 0)
  .style("top", 0)
  .style("width", "100%")
  .style("height", "100%")
  .style("z-index", "-1")

let centers = []
let interval
var body = d3.select(document.body)
var circles = svg.append('g')
var path = svg.append("path")
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('stroke-dasharray', '5 5')

var color = d3.scaleLinear().domain([1, 200]).range(['gold', 'purple'])
var radius = d3.scaleLinear().domain([1, 200]).range([1, 300])

body.on("mousedown", () => {
  const { clientX: x, clientY: y } = d3.event
  let r = 1

  centers.push({ x, y })

  currentCircle = circles
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", r)
    .attr("stroke", "black")
    .attr("fill", "white")
    .attr("fill-opacity", 0.77)

  interval = setInterval(() => {
    r += 1
    currentCircle.transition().attr("r", radius(r)).attr("fill", color(r))
  }, 10)
})

body.on("mouseup", () => {
  clearInterval(interval)
  interval = null
})

function drawConnectingLine() {
  const d = centers.map((center, i) => {
    if (i === 0) return `M ${center.x} ${center.y}`
    return `L ${center.x} ${center.y}`

  })
  path.transition().attr('d', d.join(' '))
  window.requestAnimationFrame(drawConnectingLine)
}

window.requestAnimationFrame(drawConnectingLine)