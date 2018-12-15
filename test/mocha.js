var assert = require('assert');
var request = require('request');
var temp = 0
var temp1 = 0
var temp2 = 0
var bodys = 18

describe('Test Cases', function () {
	it('should return the status of the service', function (done) {
        request.get('http://10.201.41.76:8080/', (error, response,body) => {
			if(error) done(error);
			done()
		});
	});
	
	it('To check the download functionality', function (done) {
        request.get('http://10.201.41.76:8080/downloadFile',(error, response,body) => {
			if(error) done(error);
			if (response.statusCode == 200) done();
			else done(new Error("Download api is not working"));
		});
	});
	
	it('To check the download functionality', function (done) {
        request.get('http://10.201.41.76:8080/downloadContent',(error, response,body) => {
			if(error) done(error);
			if (response.statusCode == 200) done();
			else done(new Error("Download content api is not working"));
		})
	});
	
	it('product of 2 numbers', function () {
		var a = 3;
		var b = 6;
        request.get('http://10.201.41.76:8080/product/'+a+'/'+b,(error, response,body) => {
			if(error) done(error);
			if (body == a*b) done();
			else done(new Error("product api is wrong"));
		});
	});
	
	it('to check the upload api', function () {
        request.get('http://10.201.41.76:8080/upload',(error, response,body) => {
			if(error) done(error);
			if (response.statusCode == 200) done();
			else done(new Error("upload api is not working"));
		});
	});
	
});
