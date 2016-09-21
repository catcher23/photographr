var express = require('express');
var router = express.Router();
var fs = require('fs');
var knox = require('knox');
var uuid = require('node-uuid');
var async = require('async');
var s3fs = require('s3fs');

var s3fsImpl = new s3fs('catcher1111111', {
	accessKeyId: process.env.S3_KEY,
	secretAccessKey: process.env.S3_SECRET
});
s3fsImpl.create();

var multiparty = require('connect-multiparty'),
		multipartyMiddleware = multiparty();

router.use(multipartyMiddleware);

router.get('/images', function(req, res) {
	var file = req.files.file;
	var stream = fs.createReadStream(file.path);
	return s3fsImpl.writeFile(file.originalFilename, stream)
			.then(function() {
				fs.unlink(file.path);
						return res.status(201).json({message: 'Could not delete post'})}, function(err) {
					if(err)
					console.log(err);
					return res.status(500).json({message: 'Could not delete post'});
				});
			});

module.exports = router;