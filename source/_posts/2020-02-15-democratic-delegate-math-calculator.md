---
title: Dizzying Democratic delegate... math
---

Elections in this country are weird. So many of our elections aren't measured in the number of people who vote for a candidate but instead are measured in how many points a campaign can score. The nature of the points changes and the most famous example is the Electoral College. But we're well into the Democratic presidential primary, and it has its own set of points: delegates. Now, the goal for each campaign is still to get the most votes possible but the winner isn't as simple as that. The winner is the person who can get to 1,991 delegates, which would give them 50%+ at the Democratic National Convention later this year in Wisconsin.

Delegates are mostly based on vote counts, but they are themselves much smaller numbers. And there are some sharp edges to the delegate math, such as the fact that any candidate with less than 15% gets exactly **0 delegates**.

So small flucations within an election can matter for the eventual delegate count. I wanted a very simple way to see the algorithim in action, so I made a small tool to determine how delegates are awarded within a single jurisdiction (which is another sharp edge as DNC delegates are awarded at the state _and_ district level).

Go on, give it a whirl.

<style>
  details {
    background-color: #ebebeb;
    margin-bottom: 1rem;
    padding: .4rem;
  }

  details p {
    margin-bottom: 1rem;
  }

  label {
    width: 100%;
  }

  label span {
    padding-left: .4rem;
    padding-top: .4rem;
  }

  input {
    border: none;
    font-size: 1.2rem;
    padding-top: .3rem;
    padding-bottom: .3rem;
    text-align: right;
    width: 100%;
  }
</style>

## Delegate calculator

We're starting with an assumption that each candidate got 100 votes and that there are 50 delegates available in the jurisdiction. You can, of course, change any of those assumptions below. If you change any of the fields below, the delegate count will update.

<details>
<summary>If you're done playing around or looking for a place to start, expand this section to see something I find interesting.</summary>

<p>Let's assume that everybody's doing reasonably well and getting 20,000 votes. Except one candidate is clearly leading, let's say that Bloomberg bought enough ad space and paid enough influencers to garner 33,333 votes.</p>

<button class="db" id="load-bloomberg-scenario">Make it so</button>

<p>Well, that's all well and good and everybody's getting some delegates, though Mike is winning in the vote count and therefore is also winning in the delegate race. He gets 12 while everybody else is getting 8.</p>

<p>But what if he gets _just one_ more vote? What if one of his supporters got their neighbor to come with them to the polls and cast that 33,334th vote for El Bloombito?</p>

<button class="db" id="bloomberg-scenario-give-vote">Give Bloomberg one more vote</button>

<p>That one vote throws everybody else below the 15% threshold and all the delegates go to a single candidate.</p>
</details>

<div id="delegate-calculator"></div>

## Methodology

I used the algorithim presented on [The Green Papers](http://www.thegreenpapers.com/P20/D-Math.phtml) website. As I understand it, (which is also how the calculator works), delegate allocation is as follows:

1. Take all the candidates and calculate their percentage of the vote
2. Drop all of the candidates (and associated votes) if they do not clear the threshold, which is generally 15%
3. Recalculate the percentage of the remaining vote that each candidate got
4. Multiply the percentage by the total number of delegates for that jurisdiction
5. Take note of the fractional remainders, if any, but remove them to determine the number of delegates awarded
6. Give a single delegate to the candidate who had the highest fractional remainder

<script src="/js/d3.v5.min.js"></script>
<script src="/js/democratic-delegate-math-calculator.js"></script>