var express = require('express');
var router = express.Router();
var knox = require('knox');
var uuid = require('node-uuid');
var async = require('async');

router.post('/images', function(req, res, next) {
	var data = req.body || {};
	data.filename = uuid.v4();
	data['created_at'] = new Date();

	// async waterfall (see: https://github.com/caolan/async)
	async.waterfall([

		// upload file to amazon s3
		function(cb) {

			// initialize knox client
			var knoxClient = knox.createClient({
				key: process.env.S3_KEY,
				secret: process.env.S3_SECRET,
				bucket: process.env.S3_BUCKET
			});

			// send put via knox
			knoxClient.putFile('', 'uploads/' + data.filename, {
				'Content-Type': data.type,
				'x-amz-acl': 'public-read'
			}, function(err, result) {

				if (err || result.statusCode != 200) {
					cb(err);
				}

				cb(null);

			});

		}
		// final cb function
	], function(err, result) {

		// catch all errors
		if (err) {
			// use global logger to log to console
			console.log(err);
		}

		// respond to client with result from database
		res.send(201, result);
		return next();
	});
});

module.exports = router;