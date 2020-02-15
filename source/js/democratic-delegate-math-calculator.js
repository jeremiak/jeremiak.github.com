(function() {
  let delegates = 50
  const formatNumber = d3.format(',')
  const results = [
    { name: 'Amy Klobuchar', votes: 100 },
    { name: 'Bernie Sanders', votes: 100 },
    { name: 'Elizabeth Warren', votes: 100 },
    { name: 'Joe Biden', votes: 100 },
    { name: 'Mike Bloomberg', votes: 100 },
    { name: 'Pete Buttigieg', votes: 100 },
  ]

  const bloombergLoadButton = d3.select('#load-bloomberg-scenario')
  const bloombergAddVoteButton = d3.select('#bloomberg-scenario-give-vote')

  const target = d3.select('#delegate-calculator')
  const calculator = target.append('div')
  const graf = target.append('p')
  const delegateCount = calculator.append('form')
  const form = calculator
    .append('form')

  delegateCount
    .append('label')
    .text('Number of available delegates')

  delegateCount.select('label')
    .append('input')
    .attr('type', 'number')

  form
    .append('legend')
    .style('font-weight', 700)
    .text('Candidates and their vote counts')

  const labels = form
    .selectAll('div')
    .data(results)
    .enter()
    .append('div')
      .classed('relative', true)
      .append('label')
      .classed('block', true)
      
    labels.append('span')
      .classed('absolute', true)
      .classed('block', true)
      .text(d => `${d.name}'s votes`)
    
    labels.append('input')
      .classed('bg-yellow', (d, i) => {
        if (i % 2 !== 0) return true
      })
      .classed('block', true)
      .classed('mono', true)
      .attr('data-candidate', d => d.name)
      .attr('type', 'number')
      .attr('min', 0)
      .attr('value', d => d.votes)
      .on('change', () => {
        const e = d3.event
        const changeTarget = d3.select(e.target)
        const candidate = changeTarget.attr('data-candidate')
        const value = +e.target.value
        const match = results.find(c => c.name === candidate)

        match.votes = value
        update()
      })

  function update() {
    const totalVotes = d3.sum(results, c => c.votes)
    const withPercent = results.map(result => {
      const percent = result.votes / totalVotes
      return {
        ...result,
        percent
      }
    })
    const aboveThreshold = withPercent.filter(result => {
      return result.percent >= 0.15
    })
    const belowThreshold = withPercent.filter(result => {
      return result.percent < 0.15
    })
    const totalVotesAboveThreshold = d3.sum(
      aboveThreshold,
      result => result.votes
    )
    const aboveThresholdWithRecalculatedPercent = aboveThreshold.map(result => {
      const recalculatedPercent = result.votes / totalVotesAboveThreshold
      const partialDelegates = delegates * recalculatedPercent
      const pledgedDelegates = parseInt(partialDelegates)
      const fractionalRemainder = partialDelegates % 1

      return {
        ...result,
        partialDelegates,
        pledgedDelegates,
        fractionalRemainder
      }
    })

    const maxFractionalRemainder = d3.max(
      aboveThresholdWithRecalculatedPercent,
      r => r.fractionalRemainder
    )
    const finalDelegateCounts = aboveThresholdWithRecalculatedPercent.map(
      result => {
        const { fractionalRemainder, pledgedDelegates } = result

        if (maxFractionalRemainder === 0) return result
        if (fractionalRemainder !== maxFractionalRemainder) return result

        return {
          ...result,
          pledgedDelegates: pledgedDelegates + 1
        }
      }
    )

    const resultsList = withPercent.map(
      r =>
        `<li>${r.name} got ${formatNumber(r.votes)} votes (${d3.format('.4')(r.percent * 100)}%)</li>`
    )
    const delegatesList = finalDelegateCounts.map(
      r => `<li>${r.name} would get ${r.pledgedDelegates} delegates</li>`
    )
    const belowThresholdList = belowThreshold.map(r => `<li>${r.name}</li>`)
    graf.html(`
    <p>Ok, so given that there are ${delegates} delegates available and the following vote count:</p>
    <ul>${resultsList.join('')}</ul>
    
    <p>Then they'd get the following number of delegates:</p>
    <ul>${delegatesList.join('')}</ul>

    <p>${belowThresholdList.length > 0
      ? 'And the following candidates would get no delegates, as they didn\'t clear the 15% threshold:'
      : 'All of the candidates cleared the threshold.'}
    </p>
    <ul>${belowThresholdList.join('')}</ul>
    `)
  }
  update()

  bloombergLoadButton.on('click', () => {
    results.forEach(result => {
      const { name } = result
      let votes = 20000
      if (name.includes('Bloomberg')) votes = 33333
     
      result.votes = votes
    })

    d3.selectAll('input[data-candidate]')
      .each(function(d) {
        let value = 20000
        if (d.name.includes('Bloomberg')) {
          value = 33333
        }

        d3.select(this).attr('value', value)
      })
    update()
  })
  bloombergAddVoteButton.on('click', () => {
    results.forEach(result => {
      const { name } = result
      if (name.includes('Bloomberg')) result.votes = 33334
    })

    d3.select('input[data-candidate="Mike Bloomberg"]').attr('value', 33334)
    update()
  })
})()