var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);
console.log('server is starting');
var express = require('express');
var app = express();
var server = app.listen(3000, listening);
function listening() {
	console.log("listening...");
}

app.use(express.static('public'));

app.get('/add/:word', addWord);

function addWord(request, response) {
	var data 		= request.params;
	var word  		= data.word;
	var wordPhrase 	= data.word.toLowerCase().replace(/\W/g, '');
	var rev			= wordPhrase.split('').reverse().join('');
	var wordVerif;

	if (wordPhrase == rev)
		wordVerif = "is a palindrome!"
	else 
		wordVerif = "is NOT a palindrome."

	words [word.toUpperCase()] = wordVerif;
	var data = JSON.stringify(words, null, 2);
	fs.writeFile('words.json', data, finished);
	
	function finished(err) {
		console.log('saved | ' + word.toUpperCase());
	}
	
	var reply = {
		msg: "The word/phrase was added to JSON"
	}

	response.send(reply);
}

app.get('/all', sendAll);

function sendAll(request, response) {
	response.send(words);
}

app.get('/check/:word', checkStatus);

function checkStatus(request, response) {
	var data 		= request.params;
	var wordPhrase 	= data.word.toLowerCase().replace(/\W/g, '');
	var rev = wordPhrase.split('').reverse().join('');
	
	if (wordPhrase == rev)
		response.sendStatus(200);
	else
		response.sendStatus(400);
}