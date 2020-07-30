---
title: How I get alerts for new Sacramento campaign finance reports
description: Building a local campaign finance scraper and notification system with Javascript and Google spreadsheets
# published: false
---

The Fair Political Practices Commission is California's state level campaign finance regulator. Anybody who is spending money in local elections in the state are required to file forms with the relevant office, sometimes within 24 hours of spending the money. In Sacramento, both [the city](https://public.netfile.com/pub2/Default.aspx?aid=SAC) and [the county](https://public.netfile.com/pub2/Default.aspx?aid=SCO) have campaign finance disclosure websites. Unfortunately, neither provide email notifications for new filings. Which I want. So I wrote some [code](https://github.com/jeremiak/sacramento-campaign-finance-alerts/) to do just that.

Now, both sites are useable enough (and made by the same vendor). They're decently fast and are mostly searchable. Each filing has a unique URL, which makes accessing documents later much easier. And the best part is they have RSS feeds!

The items in the feeds aren't entirely predictable and filings get cleared from it after a certain amount of time. But they exist, are valid XML, and should be good enough for my purposes.

Here's what I want: a system that lets me know when there's a new filing within a reasonable amount of time.

I also want to keep a log of all the filings as they come in so just in case I want to look at that data in the future.

Here's what I ended up building: a Javascript robot to check the RSS feeds and keep track of every filing it has already "seen" filing in [a spreadsheet](https://docs.google.com/spreadsheets/d/1wkLI963DMOC-kHwbFO2nP26vfy3nIJLi_UlzGwJEoLs/edit#gid=0), adding a new row for each new filing. Once the data is flowing into a Google spreadsheet, its possible to set up the "notification rules" so that I can get an email every time something in the spreadsheet changes. Hella easy.

<img class="block col-10 md-col-6 mx-auto" src="/img/sacramento-campfin-alerts/notification-rules.png">

The emails are pretty great too, they have a link to a view of the spreadsheet where just the new data is highlighted.

<img class="block col-10 md-col-6 mx-auto" src="/img/sacramento-campfin-alerts/highlighted-new-row.png">

I'm still trying to figure out a good robot orchestration tool, which I find remarkable given how long I've been building little bots like this. I've got a few projects running with `cron`, but it is always a headache to debug, and some triggered through a webhook-like request, which feels a bit sloppy. *If you have a tool you particularly like, please let me know!* I took this opportunity to try out a different tool: `launchctl`.

`launchctl` (and its companion `launchd`) is a Mac specific tool but I found it decently easy to schedule a task and see the `stdout` and `stderr` on the other side. It runs locally, so a downside is that the system takes a pause when my machine is asleep. I'm not going anywhere during COVID though, so for now this is going to be fine.

The basic idea is to create an XML file with a `.plist` file extension that describes your task. The file will include things like the interval to run the script on, where to output logs and errors, and how to run the script. These configuration files are "loaded" (and "unloaded") from `launchd`.

So, I created a file `com.jeremiak.sacramento-campaign-finance-filing-checker.plist`, put the following in it, and told the robots that was go time with `launchctl load com.jeremiak.sacramento-campaign-finance-filing-checker.plist`.

<style>
  .code-snippet {
    background-color: #ebebeb;
    padding: .1rem 1rem;
  }
</style>

<div class="code-snippet block col-10 mx-auto overflow-x-scroll">
<code>
<pre>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&gt;
&lt;plist version="1.0"&gt;
  &lt;dict&gt;
    &lt;key&gt;Label&lt;/key&gt;
    &lt;string&gt;com.jeremiak.sacramento-campaign-finance.plist&lt;/string&gt;

    &lt;key&gt;RunAtLoad&lt;/key&gt;
    &lt;true/&gt;

    &lt;key&gt;StartInterval&lt;/key&gt;
    &lt;integer&gt;1800&lt;/integer&gt;

    &lt;key&gt;StandardErrorPath&lt;/key&gt;
    &lt;string&gt;/Users/JeremiaKimelman/code/sacramento-campaign-finance-alerts/stderr.log&lt;/string&gt;

    &lt;key&gt;StandardOutPath&lt;/key&gt;
    &lt;string&gt;/Users/JeremiaKimelman/code/sacramento-campaign-finance-alerts/stdout.log&lt;/string&gt;

    &lt;key&gt;EnvironmentVariables&lt;/key&gt;
    &lt;dict&gt;
      &lt;key&gt;PATH&lt;/key&gt;
      &lt;string&gt;&lt;![CDATA[/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin]]&gt;&lt;/string&gt;
    &lt;/dict&gt;

    &lt;key&gt;WorkingDirectory&lt;/key&gt;
    &lt;string&gt;/Users/JeremiaKimelman/code/sacramento-campaign-finance-alerts&lt;/string&gt;

    &lt;key&gt;ProgramArguments&lt;/key&gt;
    &lt;array&gt;
      &lt;string&gt;./run.sh&lt;/string&gt;
    &lt;/array&gt;

  &lt;/dict&gt;
&lt;/plist&gt;
</pre>
</code>
</div>

The script ran immediately because I set my `RunAtLoad` "key" to `true`, and ran every 30 minutes after that. Here's <a href="https://www.unix.com/man-page/mojave/5/launchd.plist/">some documentation</a> I used for the "key" options.

Ok, so to sum up I wanted:

1. A system for getting alerts about new filings
1. A log of the campaign finance reports as they come in

Well, ✅ and ✅. Its likely not useful for many (if any) people beyond me but that's how I glued together `launchctl`, some Node scripts, and Google spreadsehets to get a custom notification system for my local campaign finance filings. I like it, I think I'll use this kind of set up again in the future for easy, custom notifications.