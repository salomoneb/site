---
layout: post
title: "A Better Way To Hide Your Email Address"
date: 2017-01-05 
---

The other day, midway down a Wikipedia rabbit hole, I started reading about *[Massachusetts Bay Transportation Authority v. Anderson](https://en.wikipedia.org/wiki/Massachusetts_Bay_Transportation_Authority_v._Anderson)*, a 2008 court case where the Boston train system tried to stop three MIT students from publicly exposing a security vulnerability that allowed them to create fare cards with values for free. 

Curious about what a bunch of ex-hackers were doing with their lives nine years later, I looked up them up. On the [contact page](www.rustyryan.net/connect/) of RJ Ryan’s website, right below several lines telling people not to spam him, I noticed an email link - a `mailto:` URL, not a form. This surprised me: directly posting your email address is an internet no-no, and if anyone would be aware of this, it’d be an MIT cryptographic specialist.

Looking at the source code, I found this bit of trickery: 
{% highlight javascript %}
  function deobfuscate() {
    var dictionary = ['@','.','r','y','a','n','m','i','t','e','d','u','j'];
    var letters = [2,12,2,3,4,5,0,6,7,8,1,9,10,11];

    var result = "mailto:";
    for (var i=0;i<letters.length;i++) {
      result += dictionary[letters[i]];
    }
    document.getElementById("mail").setAttribute("href", result);
  }
{% endhighlight %}

This is very clever. The function is called when someone clicks on the email link. Here’s what happens: 

1. `var dictionary` contains all of the characters in the email address, shuffled. `var letters` contains the indices of the letters in `dictionary`. 
2. The function loops through the elements in `letters`. 
3. The elements of `letters` are accessed from  the beginning, starting from index 0.  
Since `letters` consists of numbers, the `dictionary` elements are then accessed out of order (`dictionary[2]`, `dictionary[12]`, etc.). 
4. The result of each loop is appended to `var result`, which forms the `mailto:` string.
5. The `setAttribute` method sets the final link `href`. 

All of this works because the indices of `var letters` correspond to the order that the `dictionary` characters should be assembled in.

I have no idea how effective this actually is for stopping spambots (some people also claim that [obfuscation is worthless](https://qz.com/181635/surprise-theres-really-no-need-to-conceal-your-email-address-from-spammers/)), but I loved the idea and wanted to use it on my own website; however, as someone with a long email address, I really didn’t want to have to deal with manually shuffling the characters and assigning references to things, so I figured I’d Get The Computer To Do It For Me. 


To shuffle the variable elements, I used a version of the [Fisher-Yates Shuffle](https://bost.ocks.org/mike/shuffle/). 

Setting everything up in a way that made sense when it was decrypted turned out to be the tricky part. I started off trying to create key-value pairs for the characters and indices using objects and two-dimensional arrays, but my results kept returning all mixed up. 

I needed to find a way to shuffle my elements *and* call them in the correct order. Then I remembered [`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), which returns the first occurrence of each string value. Looping through each letter of the original email address and returning its index position in a shuffled version of the string, I was able to construct my `letters` array. 

Here’s the final code:

{% highlight javascript %}

// Enter your email. 
var name = "youremailaddress@gmail.com"

var shuffledNameArray = shuffle(name.split(""))
var shuffledNameString = shuffledNameArray.join("")

// Don't include this stuff on your webpage. 
// Fisher-Yates Shuffle (https://bost.ocks.org/mike/shuffle/)
function shuffle(array) {
  var original = array.length 
  var swapped
  var element

  while (original) {
    element = Math.floor(Math.random() * original--)
    swapped = array[original]
    array[original] = array[element]
    array[element] = swapped
  }
  return array
}

var positions = []
for (var i=0; i<name.length; i++) {
  var position = shuffledNameString.indexOf(name[i])
    positions.push(position)
}

function deobfuscate() {
	var dictionary = [".","q","@",".",".","l","c","m","a","s","u","i","i","l","a","n","b","o","e","g","a","o","m","l","m","o","s"]
	var letters = [26,8,5,25,24,21,15,18,0,13,3,16,14,1,10,11,9,2,19,7,20,12,23,4,6,17,22]
	var result = "mailto:"
	for(var i=0;i<letters.length;i++) {
		result += dictionary[letters[i]]
	}
	document.getElementById("email").setAttribute("href", result)
}
document.addEventListener("click", deobfuscate)  

{% endhighlight %}