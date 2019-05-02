
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
				req.session.user = doc;
				var collection = db.get('property');
				collection.find({},{}, function(err, docs) {
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
			} else {
				res.render('login',{"message":"Entered email id or password doesnt match !!"});
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
					res.render('landing')
				}else{
					res.render('landing')
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