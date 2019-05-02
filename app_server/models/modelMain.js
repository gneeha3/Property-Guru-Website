
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

/*
 * POST property page.
 */
module.exports.postProperty = function(req, res) {
	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes.
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phone = req.body.phone;
	var password = req.body.password;

	// Set our collection.
	var collection = db.get('property');

	collection.find({
		"email" : email
	}, function(err, doc) {
		console.log(doc);
		if (doc.length!=0) {
			console.log("1");
			res.render('property',{"message":"Property already exists"});
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
					res.render('property',{"message":"Error.Try again!!"});
				} else {
					// Forward to success page
					res.render('property',{"message":"Property Posted Successfully!!"});
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
				req.session.user = doc;
				res.redirect('/buySearch');
			}
		}
	});

};

module.exports.postSearch = function(req,res)
{
	var db = req.db;
	var county = req.body.county;
	var bedrooms = req.body.bedrooms;
	var collection = db.get('property');
	if(county=='Any' && bedrooms!="Any"){

		collection.find({"bedrooms":bedrooms}, function(err, docs) {
			console.log(docs);
			if (err) {
				res.render('buySearch',{"message":"Error.Try again","name":req.session.user[0].first_name});

			} else {
				if(docs.length > 0){
					res.render('buySearch',{"propertyList":docs,"flag":2,"name":req.session.user[0].first_name});
				} else {
					res.render('buySearch',{"message":"No property listing found matching to filter criteria ","flag":3,"name":req.session.user[0].first_name});
				}
			}
		});
	} else {
		if(bedrooms=='Any' && county!='Any'){
		collection.find({"county":county}, function(err, docs) {
			console.log(docs);
			if (err) {
				res.render('buySearch',{"message":"Error.Try again","name":req.session.user[0].first_name});

			} else {
				if(docs.length > 0){
					res.render('buySearch',{"propertyList":docs,"flag":2,"name":req.session.user[0].first_name});
				} else {
					res.render('buySearch',{"message":"No property listing found matching to filter criteria ","flag":3,"name":req.session.user[0].first_name});
				}
			}
		});
	} else {
		if(bedrooms=='Any' && county=='Any'){
		collection.find({},{}, function(err, docs) {
			console.log(docs);
			if (err) {
				res.render('buySearch',{"message":"Error.Try again","name":req.session.user[0].first_name});

			} else {
				if(docs.length > 0){
					res.render('buySearch',{"propertyList":docs,"flag":2,"name":req.session.user[0].first_name});
				} else {
					res.render('buySearch',{"message":"No property listing found matching to filter criteria ","flag":3,"name":req.session.user[0].first_name});
				}
			}
		});
	} else {
	collection.find({"county":county,"bedrooms":bedrooms}, function(err, docs) {
		console.log(docs);
		if (err) {
			res.render('buySearch',{"message":"Error.Try again","name":req.session.user[0].first_name});

		} else {
			if(docs.length > 0){
				res.render('buySearch',{"propertyList":docs,"flag":2,"name":req.session.user[0].first_name});
			} else {
				res.render('buySearch',{"message":"No property listing found matching to filter criteria ","flag":3,"name":req.session.user[0].first_name});
			}
		}
	});

	}
	}
	}
};


module.exports.buySearch = function(req,res)
{
	var db = req.db;
	var collection = db.get('property');
	collection.find({},{}, function(err, docs) {
		console.log(docs);
		if (err) {
			res.render('buySearch',{"message":"Error.Try again","name":req.session.user[0].first_name});

		} else {
			if(docs.length > 0){
				res.render('buySearch',{"allList":docs,"flag":1,"name":req.session.user[0].first_name});
			} else {
				res.render('buySearch',{"message":"No property to display","name":req.session.user[0].first_name});
			}
		}
	});

};

//Fetch property details as per the object id value from buySearch.
module.exports.propertyDetails = function(req, res) {
	var property_id = req.body.property_id;
	var db = req.db;
	var collection = db.get('property');

collection.find({
		"_id" : property_id
	}, function(err, doc) {
		if (err) {
			res.render('propertyDetails',{"message":"Error.Try again","name":req.session.user[0].first_name});
		} else {
			collection.find({"_id":property_id}, function(err, docs) {
				console.log("Property ID is :", req.params.id);
				// console.log(id);
				console.log(req.session.user[0].email);
				if (err) {
					res.render('propertyDetails',{"allList":docs, "message":"Error.Try again. Property not found.","name":req.session.user[0].first_name});
					console.log("Details not found!", docs);

				} else {
					if(docs.length > 0){
						res.render('propertyDetails',{"allList":docs,"name":req.session.user[0].first_name});
						console.log("Details found are: ", docs);
					} else {
						res.render('propertyDetails',{"message":"No property to display","name":req.session.user[0].first_name});
					}
				}
			});
		}
	});
};
//End

module.exports.contactMessage = function(req, res) {
	var db = req.db;
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;



	var collection = db.get('query');

			collection.insert({
				"name" : name,
				"email" : email,
				"subject" : subject,
				"message" : message
			}, function(err, doc) {
				if (err) {
					res.redirect('/');
				}else{
					res.redirect('/');
				}
			});

};

module.exports.userListings = function(req,res)
{
	var db = req.db;
	var collection = db.get('property');
	collection.find({"email":req.session.user[0].email}, function(err, docs) {
		console.log(docs);
		console.log(req.session.user[0].email);
		if (err) {
			res.render('userListings',{"message":"Error.Try again","name":req.session.user[0].first_name});

		} else {
			if(docs.length > 0){
				res.render('userListings',{"allList":docs,"name":req.session.user[0].first_name});
			} else {
				res.render('userListings',{"message":"No property to display","name":req.session.user[0].first_name});
			}
		}
	});

};


/*
 * Needs to be updated
 */
module.exports.deleteProperty = function(req, res) {
	var property_id = req.body.property_id;
	var db = req.db;
	var collection = db.get('property');

	collection.remove({
		"_id" : property_id
	}, function(err, doc) {
		if (err) {
			res.render('userListings',{"message":"Error.Try again","name":req.session.user[0].first_name});
		} else {
			collection.find({"email":req.session.user[0].email}, function(err, docs) {
				console.log(docs);
				console.log(req.session.user[0].email);
				if (err) {
					res.render('userListings',{"message":"Error.Try again","name":req.session.user[0].first_name});

				} else {
					if(docs.length > 0){
						res.render('userListings',{"allList":docs,"name":req.session.user[0].first_name});
					} else {
						res.render('userListings',{"message":"No property to display","name":req.session.user[0].first_name});
					}
				}
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
