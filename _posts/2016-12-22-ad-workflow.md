---
layout: post
title: "Creating An Automated Ad Workflow With Google Scripts"
date: 2016-12-22
---
It feels a little silly to evangelize Google, one of the largest, richest companies in the world and a soulless, monolithic enterprise if ever there was one, but I’ll come right out and say it: the Google Docs suite is really, really cool. 

Beyond the basic fact that you get to seamlessly collaborate with people in real-time, the functionality is exceptional; simple enough for anyone to use, but with enough APIs, documentation, and developer support to create fully-fledged custom software. 

Here’s an example of a workflow I recently built to help an organization with their digital advertising. 

We were running a series of ads on Google and Facebook and the organization staff wanted to be able to see both their top-level numbers (likes, impressions, clicks, etc.) as well as trends in performance over time. 

In a non-Google Docs world, this would involve manually going into the Google and Facebook dashboards, pulling the numbers at intervals (every day, every week), compiling it into spreadsheets, creating a boring chart (or getting a designer to create a slightly better-looking chart), and then repeating the process ad infinitum. 

This sounds terrible. 

Here’s what I did instead: 

1. Wrote custom scripts using [Google Apps Script](https://developers.google.com/apps-script/) and [Google AdWords Scripts](https://developers.google.com/adwords/scripts/) to programmatically pull the advertising data from our Facebook and Google accounts, respectively, and plop them into Google Sheets.

2. The scripts run daily and append yesterday’s data in new rows to each sheet. Rather than updating lifetime figures in the same rows, the sheets accumulate daily performance snapshots, giving us a series of data points with which to visualize trends. 

3. Pulled all of the rows from each sheet into a third sheet. This step combines everything into one place. 

4. Aggregated the combined Google and Facebook data into a fourth, final sheet sorted by campaign using a combination of [`QUERY`](https://support.google.com/docs/answer/3093343?hl=en) and [`IMPORTRANGE`](https://support.google.com/docs/answer/3093340?hl=en) functions, and filtered with [AWQL](https://developers.google.com/adwords/api/docs/guides/awql), which I then shared with the client. **This gave the organization staff a clear, real-time look at the lifetime figures for each campaign without affecting the original daily data.** 

5. Created a reporting template with charts and graphs in [Google Data Studio](https://datastudio.google.com/u/0/#/org//navigation/reporting) and then automatically linked my raw data. Did you know that Data Studio can integrate with Google Sheets, as well as nine other data sources (including MySQL and PostgreSQL databases)? You do now! Like the spreadsheet information, because the template is fed with real-time data, it’s constantly updating. 

You can check out the code I wrote to access the raw Google and Facebook numbers [here](https://github.com/salomoneb/adwords-scripts). I would have liked to have created these as a single script, but that would have required a certain level of OAuth configuration hell that I didn't feel like dealing with. 
 


 