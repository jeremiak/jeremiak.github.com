;(function(window) {
  const height = 500
  const width = 800
  const margin = { x: 100, y: 100 }

  d3.selectAll(".no-js").classed("no-js", false)

  const $svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  d3.csv("/data/parties-to-fourteenth-amendment-cases-1872-1910.csv")
    .then(data => {
      const years = []
      const opinions = []
      data.forEach(d => {
        years.push(+d["October Term"])
        opinions.push(+d["Total opinions"])
      })

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(years))
        .range([0 + margin.x, width - margin.x])
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(opinions))
        .range([height - margin.y, 0 + margin.y])

      const lineGenerator = d3
        .line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.count))
        .curve(d3.curveCatmullRom.alpha(0.5))

      const colors = {
        "total-opinions": "black",
        "african-americans": "blue",
        individuals: "green",
        corporations: "purple"
      }

      const lines = [
        "Total opinions",
        "African americans",
        "Individuals",
        "Corporations"
      ].map(key => ({
        key,
        values: data.map(d => ({
          year: +d["October Term"],
          count: +d[key]
        }))
      }))

      const $yAxis = $svg
        .append("g")
        .attr("class", "axis y-axis")
        .attr("transform", `translate(${margin.x * 0.75}, 0)`)
        .call(d3.axisLeft(yScale))

      $yAxis
        .append("text")
        .attr("transform", `rotate(270) translate(-120, -${margin.x / 2})`)
        .text("Cases involving the 14th amendment")

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
      const $xAxis = $svg
        .append("g")
        .attr("class", "axis y-axis")
        .attr("transform", `translate(0, ${height - margin.y / 1.25})`)
        .call(xAxis)

      $xAxis
        .append("text")
        .attr("transform", `translate(${width / 2}, ${margin.y / 2})`)
        .text("Year")

      const $paths = $svg
        .append("g")
        .attr("id", "lines")
        .selectAll("path")
        .data(lines, d => d.key)
        .enter()
        .append("path")
        .attr("id", d => kebab(d.key))
        .attr("d", d => lineGenerator(d.values))
        .attr("stroke", "none")
        .attr("fill", "none")

      function animateLine(id) {
        const $path = d3.select(`#${id}`)
        const pathLength = $path.node().getTotalLength()
        const data = $path.datum()
        const finalColor = colors[id]
        const last = data.values.pop()
        const textX = xScale(last.year)
        const textY = yScale(last.count)

        $path
          .attr("stroke", "gold")
          .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
          .attr("stroke-dashoffset", pathLength)
          .transition()
          .duration(2000)
          .attr("stroke-dashoffset", 0)

        $path
          .transition()
          .delay(2000)
          .duration(500)
          .attr("stroke", finalColor)

        $svg
          .select("#lines")
          .append("g")
          .attr("transform", `translate(${textX}, ${textY})`)
          .append("text")
          .attr("class", "mono fs-10")
          .attr("stroke", finalColor)
          .attr("opacity", 0)
          .text(data.key)
          .transition()
          .delay(2100)
          .duration(200)
          .attr("opacity", 1)
      }

      lines.forEach((line, i) => {
        setTimeout(() => {
          animateLine(kebab(line.key))
        }, i * 2500)
      })
    })
    .catch(e => {
      console.error("Uh oh", e)
    })
})(window)
