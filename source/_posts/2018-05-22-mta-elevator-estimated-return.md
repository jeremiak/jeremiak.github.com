---
title: How long will that subway elevator be out of service?
---

The subways here in NYC, run by the MTA, are routinely criticized for their lack of ADA compliance and accessibility. The system does have elevators (way too few!) but they sometimes go out of service, wreaking havoc on some folk's commutes. The MTA [posts elevator outages to their website](http://advisory.mtanyct.info/EEoutage/EEOutageReport.aspx?StationID=All) along with the time the elevator will return to service. But how good of a guide are these estimates?

Well, my robots and me have scraped ~4300 elevator outages ([data](/data/mta-elevators/outages-estimated-returns.csv)) and the short answer is: **the estimates aren't terrible**.

First, a bit about what I scraped. The MTA posts elevator (and escalator, though I haven't done anything with those) outages on their site. They have a table of outages with their estimated return. When the elevator re-enters service, they take down the outage notice. My scraper runs every minute and makes a note of when a previously noticed outage is no longer there. I have characterized this as the "first miss" in my data. It isn't _really_ when the elevator re-entered service, but it is the best approximation from the public notices I could find.

Ok, so, how reliable are the estimates? Of the <span id="outage-count">~4300</span> outages I scraped since <span id="initial-scrape-date">February 2018</span>, in the best case the MTA beat their estimate by <span id="best-difference">~7.5 hours</span> and, in the worst case, missed their estimate by <span id="worst-difference">~45 days</span>. On average, elevators returned to service about <span id="average-difference">3 hours earlier</span> than the estimate times.

<div class="chart-container no-js" id="outages-differences">
  <p class="no-js-msg">This article requires Javascript to generate charts.</p>
  <div class="chart"></div>
  <div class="caption"></div>
</div>

The robots are still hard at work so I hope to update this post in the future and do some further explorations of the data. Please get in touch if you have any questions or ideas!

<style>
  .no-js-msg {
    display: none;
  }
  .chart-container.no-js .no-js-msg {
    display: block;
  }
  .no-js .chart,
  .no-js .caption {
    display: none;
  }

  .outage line {
    cursor: pointer;
    stroke: black;
  }
  .outage line.selected {
    stroke: red;
  }

  .caption {
    font-family: monospace;
    font-size: .75rem;
  }
</style>

<script src="/js/d3.v5.min.js"></script>
<script src="/js/elevator-outage-estimates.js"></script>
