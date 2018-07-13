---
title: Companies and the 14th amendment
---

Even before these last few weeks of horrendous news from the Supreme Court, I've been thinking about the institution quite a bit recently because I am reading "We the Corporations: How American businesses won their civil rights" by Adam Winkler. He chronicles the history of the ever expanding rights granted to corporations by the Supreme Court. Though the recent (and _very shitty_) Citizens United decision gives corporations the right to freely spend on domestic political elections, companies have been exploiting the 14th Amendment since nearly its ratification.

The 14th Amendment, originally drafted to extend rights to former slaves, was passed following the Civil War. Perhaps predictably, because this is America: the land of the dollar, corporations started to use their massive bank accounts to fight for the rights of "artificial" persons. In fact, Winkler cites a startling, albeit brief, finding from a long dead law librarian of Congress named Charles Wallace Collins about the types of parties involved in cases related to the 14th amendment. Collins analyzed all the 14th amendment cases between 1872 and 1910 and found that corporations brought the overwhelming number of cases before the Court.

<style>
  .container {
    position: relative;
  }

  .chart-container {
    position: sticky;
    top: 3.5rem;
  }

  .step {
    min-height: 20rem;
    opacity: .2;
    transition: opacity 1s linear;
  }

  .step p {
    position: sticky;
    top: .5rem;
  }
</style>

<div class="container clearfix">
  <div class="chart-container no-js" id="outages-differences">
    <p class="no-js-msg">This article requires Javascript to generate charts.</p>
    <div class="chart"></div>
    <div class="caption mono"></div>
    {% include chart_source.html href="https://www.google.com/url?q=https://books.google.com/books?id%3DtBBD9JdqFNkC%26pg%3DPA138%23v%3Donepage%26q%26f%3Dfalse&sa=D&ust=1530321642501000&usg=AFQjCNFgKM2vG5F5Z-IZGHJEAxpw8RDRaw" source="The Fourteenth Amendment and the States: A Study of the Operation of the Restraint Clauses of Section One of the Fourteenth Amendment to the Constitution of the United States by Charles Wallace Collins" %}
  </div>

  <div class="steps">
    <div class="step" data-line="total-opinions">
      <p class="bg-gold-translucent px1 py2">
      Between 1872 and 1910 there were a total of 604 cases that pivoted on the 14th amendment.
      </p>
    </div>
    <div class="step" data-line="african-americans">
      <p class="bg-gold-translucent px1 py2">
        Just 28 of them were brought on behalf of African Americans. So who brought the rest?
      </p>
    </div>
    <div class="step" data-line="individuals">
      <p class="bg-gold-translucent px1 py2">
        Well, the 14th amendment was used by individuals, just not Black people. 264 of the total cases were brought by individuals seeking redress against the government.
      </p>
    </div>
    <div class="step" data-line="corporations">
      <p class="bg-gold-translucent px1 py2">
        Companies, with their large piles of gold and army of lawyers, brought 312 cases before the Supreme Court under the 14th Amendment. More than half of _all_ the cases looked at in Collins' survey.
      </p>
    </div>
  </div>

</div>

All of this was pretty surprising to me because I was under the (naive) impression that Citizens United was somehow unique in its corporate abuse of an amendment written to explicitly grant rights to _real_ humans. But clearly, this has been going on for a long time.

This just goes to show you that the more you dig into the history of this country, the more you'll find the compounded evils of corporate greed and racism. Or, at least, that's frequently my conclusion.

<script src="/js/lib/intersection-observer-v0.5.0.js"></script>
<script src="/js/lib/scrollama-v1.4.1.js"></script>
<script src="/js/lib/d3.v5.min.js"></script>
<script src="/js/util.js"></script>
<script src="/js/posts/companies-and-the-fourteenth-amendment.js"></script>
