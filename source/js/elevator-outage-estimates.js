(function(window) {
  const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
  const formatDate = date => {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`
  }

  const formatNumber = num => num.toLocaleString('en')

  const formatTime = time => {
    const minutes = time.getMinutes()
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${time.getHours()}:${paddedMinutes}`
  }

  const formatTimeAmount = timeAmount => {
    const time = Math.abs(timeAmount)
    if (time < 60) return `${Math.round(time)} minutes`
    else if (time >= 60 && time < 1440) return `${Math.round(time / 60)} hours`
    else if (time >= 1440) return `${Math.round(time / 60 / 24)} days`
  }

  const csv = '/data/mta-elevators/outages-estimated-returns.csv'
  d3.csv(csv).then(data => (
    data.filter(d => d['difference (min)'] !== 'NaN').map(d => {
      return Object.assign({}, d, {
        out_of_service: new Date(d.out_of_service),
        first_missed: new Date(d.first_missed),
        estimated_return: new Date(d.estimated_return),
        ['difference (min)']: +d['difference (min)']
      })
    })
  )).then(data => {
    const dates = []
    const differences = []
    data.forEach(d => {
      dates.push(d.out_of_service)
      dates.push(d.first_missed)
      dates.push(d.estimated_return)

      differences.push(d['difference (min)'])
    })
    const diffExtent = d3.extent(differences)
    const diffMean = d3.mean(differences)
    const initialScrape = new Date(data[0].out_of_service)
    const outageCount = data.length
    const $diffContainer = d3.select('#outages-differences')

    $diffContainer.classed('no-js', false)
    d3.select('#outage-count').text(formatNumber(outageCount))
    d3.select('#initial-scrape-date').text(formatDate(initialScrape))
    d3.select('#best-difference').text(formatTimeAmount(diffExtent[0]))
    d3.select('#worst-difference').text(formatTimeAmount(diffExtent[1]))
    d3.select('#average-difference').text(`${formatTimeAmount(diffMean)} ${diffMean < 0 ? 'earlier': 'later'}`)

    const $caption = $diffContainer.select('.caption')
    const $svg = $diffContainer.select('.chart')
      .append('svg')

    const updateCaption = d => {
      const html = `
        Elevator <strong>${d.elevator}</strong> went out of service
        on <strong>${formatDate(d.out_of_service)}</strong> at
        <strong>${formatTime(d.out_of_service)}</strong>. It was
        estimated to return to service at
        <strong>${formatTime(d.estimated_return)}</strong> on
        <strong>${formatDate(d.estimated_return)}</strong> but actually
        went back online at <strong>${formatTime(d.first_missed)}</strong>
        on <strong>${formatDate(d.first_missed)}</strong>, which was
        <strong>${formatTimeAmount(d['difference (min)'])}
        ${d['difference (min)'] > 0 ? 'late' : 'early'}</strong>.
      `
      $caption.html(html)
    }

    const updateChart = data => {
      const height = 350
      const padding = 10
      const width = $diffContainer.node().offsetWidth
      const xScale = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width - (2 * padding)])
      const yScale = d3.scaleLinear()
        .domain(diffExtent)
        .range([0, height - (2 * padding)])

      $svg.attr('height', height).attr('width', width)
      $svg.selectAll('g').data(data).enter()
        .append('g')
            .attr('class', 'outage')
          .append('line')
            .attr('x1', d => xScale(new Date(d.out_of_service)))
            .attr('y1', yScale(0))
            .attr('x2', d => xScale(new Date(d.out_of_service)))
            .attr('y2', d => yScale(+d['difference (min)']))
            .on('mouseover', d => {
              d3.select(d3.event.target).classed('selected', true)
              updateCaption(d)
            })
            .on('mouseout', d => {
              d3.select(d3.event.target).classed('selected', false)
            })
    }

    updateChart(data)

    window.addEventListener('resize', e => {
      console.log('resized', e)
      updateChart(data)
    })
  })
})(window)
