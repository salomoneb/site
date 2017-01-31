---
layout: post
title: "Using UrlFetchApp"
date: 2016-12-24
---
You can make HTTP requests in a Google Apps Script using [`UrlFetchApp`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app). This is very useful if you want to integrate external APIs with something like a Google sheet. Here's how I used it to pull in [Facebook advertising data:]({{ site.baseurl }}{% link _posts/2016-12-22-ad-workflow.md %})

{% highlight javascript %}
var token = "XXXXX"

var url = "https://graph.facebook.com/v2.8/act_10155507023415075"
+ "?fields=campaigns%7Bname%2C%20status%2Cinsights.fields(date_start%2Cdate_stop%2Cclicks%2Cimpressions%2Cctr%2Ccpc%2Cspend).date_preset(lifetime)%7D&access_token="
+ token

function callDataSource() {
 var response = UrlFetchApp.fetch(url)
 var parsedResponse = JSON.parse(response.getContentText())
 var dataKey = parsedResponse.campaigns.data
 
 return dataKey
}
{% endhighlight %}
