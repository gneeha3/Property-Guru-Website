/*
 * GET user list page.
 */
module.exports.get_destinations = function(req, res) {
	var db = req.db;
	var collection = db.get('destination');
	collection.find({}, {}, function(err, docs) {
		console.log(docs);
		res.render('userlist', {
			"destlist" : docs
		});
	});
};

/*
 * POST add user page.
 */
module.exports.postRegister = function(req, res) {
	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes.
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phone = req.body.phone;
	var password = req.body.password;

	// Set our collection.
	var collection = db.get('user');

	collection.find({
		"email" : email
	}, function(err, doc) {
		console.log(doc);
		if (doc.length!=0) {
			console.log("1");
			res.render('register',{"message":"User with entered email already exists"});
		} 
		else{
			collection.insert({
				"first_name" : firstName,
				"last_name" : lastName,
				"email" : email,
				"phone" : phone,
				"password" : password
			}, function(err, doc) {
				if (err) {
					res.render('register',{"message":"Error.Try again!!"});
				} else {
					// Forward to success page
					res.render('login');
				}
			});
			
		}
	});
};


module.exports.postLogin = function(req,res)
{
	var db = req.db;
	var email = req.body.email;
	var password = req.body.password;

	var collection = db.get('user');
	collection.find({"email":email,"password":password}, function(err, doc) {
		console.log(doc);
		if (err) {
			res.render('login',{"message":"Error.Try again!!"});
		} else {
			if(doc.length > 0){
				res.render('buySearch');
			} else {
				res.render('login',{"message":"Entered email id or password doesnt match !!"});
			}		
		}
	});
};

/*
 * Needs to be updated
 */
module.exports.post_deletedest = function(req, res) {
	var hotel_name = req.body.hotel_name;
	var db = req.db;
	var collection = db.get('destination');

	collection.remove({
		"hotel_name" : hotel_name
	}, function(err, doc) {
		if (err) {
			res.send("Delete failed.");
		} else {
			res.render('index', {
				"title" : 'admin dashboard.',
				"message" : 'Destination details deleted successfully'
			});
		}
	});
};

// To load json data to database
module.exports.post_loaddataset = function(req, res) {

	var data = require('../../MOCK_DATA.json');
	var db = req.db;
	var collection = db.get('destination');
	collection.insert(data, function(err, docs) {
		if (err) {
			res.render('index', {
				"title" : 'admin dashboard.',
				"message" : 'Records already uploaded'
			});
		} else {
			// Forward to success page
			res.render('index', {
				"title" : 'admin dashboard.',
				"message" : '1000 Records inserted successfully'
			});
		}
	});
};

// MongoDB Search Destination
module.exports.searchCity = function(req, res) {
	var hotelName = req.body.hotelName;
	var db = req.db;
	var collection = db.get('destination');

	collection.find({
		hotel_name : hotelName
	}, function(err, doc) {
		if (err) {
			res.send("Find failed.");
		} else {
			res.render('update_delete', {
				"destlist" : doc
			});
		}
	});
};

module.exports.post_updatedest = function(req, res) {
	var db = req.db;
	var collection = db.get('destination');

	var hname = req.body.hotel_name;
	var cName = req.body.city;
	var price = req.body.cost;
	var hAddress = req.body.hotel_address;
	var cNumber = req.body.phone;

	collection.update({
		"hotel_name" : hname
	}, {
		$set : {
			"hotel_address" : hAddress,
			"phone" : cNumber,
			"cost" : price
		}
	}, function(err, doc) {
		if (err) {
			res.send("Update failed.");
		} else {
			res.render('index', {
				"title" : 'admin dashboard.',
				"message" : 'Destination details updated successfully'
			});
		}
	});

};