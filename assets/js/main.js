console.log("%c👋", "font-size:x-large")
/* Taken from RJ Ryan: http://www.rustyryan.net/connect/ */
let emailLink = document.getElementById("email")
emailLink.addEventListener("click", deobfuscate)
function deobfuscate() {
	let dictionary = [".","q","@",".",".","l","c","m","a","s","u","i","i","l","a","n","b","o","e","g","a","o","m","l","m","o","s"]
	let letters = [26,8,5,25,24,21,15,18,0,13,3,16,14,1,10,11,9,2,19,7,20,12,23,4,6,17,22]
	let result = "mailto:"
	for(var i=0;i<letters.length;i++) {
		result += dictionary[letters[i]]
	}
	emailLink.setAttribute("href", result)	
}
