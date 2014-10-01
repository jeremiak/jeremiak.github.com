---
layout: post
title:  "Web scraping with a single line of code"
date:   Wed, 29 Jan 2014 21:45:42 -0500
category: blog
---

Last Fall, the US Federal government shut down because of our elected
representatives’ inability to compromise. The general sentiment seemed to be
that daily life continued on uninterrupted, and to the more cynical the whole
event illustrated the government’s lack of relevance. I made an impassioned,
though perhaps quixotic, plea to consider the larger impact on things like our
national scientific research, important social programs, and the most sexy of
all: the national debt.  

I needed a way to illustrate the impact this political stalemate and the
measure that made the most sense was the interest rate on US debt. In other
words, I was concerned with the recent change in the price that investors were
willing to pay for Treasury debt, which funds the operations of the Federal
Government.  The particular measure that I used was the price of various debt
offerings, but I focused in particular on the 1 month issue called a “T-bill".
The Treasury department publishes these prices in a nice table that looks like
this:


![image](https://31.media.tumblr.com/6c48256816856d31e9cc13c5960da49b/tumblr_i
nline_n0704gEPOw1qhduxc.png)

(Source: _[http://www.treasury.gov/resource-center/data-chart-center/interest-
rates/Pages/TextView.aspx?data=yieldYear&year=2013](http://www.treasury.gov
/resource-center/data-chart-center/interest-
rates/Pages/TextView.aspx?data=yieldYear&year=2013)_)


While I appreciate the Treasury Department releasing these numbers in such an
easy-to-read manner, I really wanted to be able to play with them in a
spreadsheet and graph them in different ways. To get all the data straight off
the page, I could either copy and paste the data off or scrape it. Of course,
some civil servant put in the effort to get all this data into the table, and
I had no desire to reverse engineer that effort. After all, I optimize for
laziness.  

Web scraping is a simple idea: pull some data off of some place on the
internet. Generally, scraping is practiced by programmatically crawling a web
site and parsing it. I only had a few minutes so I decided to try out a Google
Docs trick I had recently heard about: ImportHTML().  

Back at the Treasury’s site, you can see there is a nice, big table element in
the middle of the page with all of the desired data.  I made a new spreadsheet
and in cell A1 I set the value of the cell equal to:  

> =ImportHTML("_[http://www.treasury.gov/resource-center/data-chart-center
/interest-
rates/Pages/TextView.aspx?data=yieldYear&year=2013](http://www.treasury.gov
/resource-center/data-chart-center/interest-
rates/Pages/TextView.aspx?data=yieldYear&year=2013)_", "table", 66)

You can see that I’m essentially invoking the ImportHTML function and passing
in three parameters, in a particular order.

  1. The first parameter is the URL of the web page to scrape. In this case its the URL of our nice Treasury table at _[http://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yieldYear&year=2013](http://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yieldYear&year=2013)_
  2. The HTML element tag that you’d ultimately like to pull out. In this case that means we’ll want to put “table” as the second parameter since the data is contained within a <table> element on the Treasury page. You can easily find out the element type by using something akin to Chrome Developer Tools but that’s beyond the scope of this post
  3. The third parameter is the most confusing by far. The best way to think of it is the following: Take all of the “table” elements on the page and put them into a list that is ordered by where they appear in the source code, and then count down the list (starting at 0) unit you get to the item you want to scrape. This can be somewhat tricky, as you’ll notice that in my function I supplied the value 66. This means that the table I wanted was the 67th table on the page as ordered within the source code. Now, that page does not look like it has 60+ tables on the page, so it took me a few minutes to get the number correct and might take some trial and error.

Once you supply the function, you’ll find that the tabular data is pulled into
your Google Spreadsheet and represented correctly in columns and rows. All I
did next was make a second sheet that was simply a line plot of all the data
pulled from the Treasury’s web site. In fact, the chart just looked like this:  

![image](https://31.media.tumblr.com/24acf9043d6c3bf69e4d3475fe17814c/tumblr_i
nline_n0706wqjQ21qhduxc.png)

(Feel free to check out both the spreadsheet and chart, right here: _[https://
docs.google.com/spreadsheet/ccc?key=0AteUjArWq80LdDgzM1NEbzlHSHY1U3hSczdPV3VMM
FE&usp=drive_web#gid=2](https://docs.google.com/spreadsheet/ccc?key=0AteUjArWq
80LdDgzM1NEbzlHSHY1U3hSczdPV3VMMFE&usp=drive_web#gid=2)_)  

The last piece I needed was annotations so that I could actually demarcate
where the shutdown was and some relevant preceding events. Fortunately, this
is also surprisingly easy in Google Docs as you just need a column at the end
of the data set with no header value. In the chart above, the letter “H” is
where the shutdown began and “J” is where it ended. That massive spike in the
blue line that was previously following the bottom of the chart is the
increased immediate cost of borrowing during the shutdown.


Turns out that the cost of short term Treasury debt is not a really compelling
story for my friends and many continued to opine that the government shutdown
was indistinguishable from life before it. But at least I have a pretty chart
now, and to create it only took three minutes and one line of code.
