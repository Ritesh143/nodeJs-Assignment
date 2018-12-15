const express = require('express');
var app = express();
const fs = require('fs')
var path = require('path');
const formidable = require('formidable');
const request = require('request');
const cheerio = require('cheerio');
//to run a service
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'));
}).listen(8080,() => console.log("up an running"));
//download a file
app.get('/downloadFile',(req,res) => {
	res.download('./package-lock.json');
	// res.end(String(parseInt(req.params.a) * parseInt(req.params.b)));
});
// show content of a file to the user
app.get('/downloadContent',(req,res) => {
	fs.readFile('./package-lock.json', (err,data) => {
		res.end(data);
	});
});
// returning product of two numbers
app.get('/product/:a([0-9]+)/:b([0-9]+)',(req,res) => {
	res.end(String(parseInt(req.params.a) * parseInt(req.params.b)));
});
// upload api
app.post('/upload',(req,res) => {
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname+"/html/";
	form.parse(req,function(err,fields,files){
		console.log(fields); 
		console.log(files);
		var oldpath = files.image.path;
		var newpath = __dirname + files.image.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
			res.end('File uploaded');
		});
	});
});
// returning non repeating characters
app.get('/nonRepeating/:name([a-zA-Z]+)',(req,res) => {
	var name = req.params.name;
	var count = 0;
	for (i = 0; i < name.length-1; i++){
		for (j = i+1; j < name.length; j++){
			if (name[i] == name[j]){
				count++;
				break;
			};
		};
		if (count == 0) res.end(name[i]);
		count = 0;
	}
	res.end("All characters in the provided input are repeating.");
}); 
// web crawler
request('https://wiprodigital.com/',(err,response,body) => {
	const $ = cheerio.load(body);
	var url = [];
	$('img').each(function(i, elem) {
		console.log($(this).attr('src').indexOf('http'));
		if($(this).attr('src').indexOf('http') >= 0)
			url.push($(this).attr('src')+'\n');
	});
	$('a').each(function(i, elem) {
		if($(this).attr('href').indexOf('http') >= 0)
			url.push($(this).attr('href')+'\n');
	});
	
	fs.writeFile("./crawler.txt", url, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("Written to a file");
	}); 
});

