/*
 * GET user list page.
 */
module.exports.get_destinations = function(req, res) 
{
    var db = req.db;
    var collection = db.get('destination');
    collection.find({}, {}, 
                    function(err, docs)
                    {	console.log(docs);
                        res.render('userlist', { "destlist" : docs });
                    });
};


/*
 * POST add user page.
 */
module.exports.post_adddest = function(req, res) 
{
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes.
    var cityName = req.body.cityName;
    var hotelName = req.body.hotelName;
    var pricePerNight = req.body.pricePerNight;
    var hotelAddress = req.body.hotelAddress;
    var contactNumber = req.body.contactNumber;

    // Set our collection.
    var collection = db.get('destination');

    // Submit to the database.
    collection.insert( { "city" : cityName,
                         "hotel_name" : hotelName,
                         "hotel_address" : hotelAddress,
                         "phone" : contactNumber,
                         "cost" :pricePerNight},
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Insert failed.");
                           }
                           else {
                               // Forward to success page
                        	   res.render('index', { "title": 'admin dashboard.',"message":'Destination details saved successfully' });
                           }
                       });
   
};

/*
 * Needs to be updated
 */
module.exports.post_deletedest = function(req, res) 
{
    var hotel_name = req.body.hotel_name;
    var db = req.db;
    var collection = db.get('destination');

    collection.remove( { "hotel_name" : hotel_name },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Delete failed.");
                           }
                           else {
                        	   res.render('index', { "title": 'admin dashboard.',"message":'Destination details deleted successfully' });
                           }
                       });
};

//To load json data to database
module.exports.post_loaddataset = function(req, res){

    var data = require('../../MOCK_DATA.json');
    var db = req.db;
    var collection = db.get('destination');
    collection.insert( data ,
      function (err, docs) 
      {
          if (err) {
        	  res.render('index', { "title": 'admin dashboard.',"message":'Records already uploaded' });
          }
          else {
              // Forward to success page
        	  res.render('index', { "title": 'admin dashboard.',"message":'1000 Records inserted successfully' });
          }
      });
};


//MongoDB Search Destination
module.exports.searchCity = function(req, res)
{
    var hotelName = req.body.hotelName;
    var db = req.db;
    var collection = db.get('destination');
    
    collection.find( { hotel_name : hotelName }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {		 
                        	 res.render('update_delete', { "destlist" : doc });
                         }
                     });
};

module.exports.post_updatedest = function(req, res) 
{
	var db = req.db;
    var collection = db.get('destination');
   
    var hname = req.body.hotel_name;
    var cName = req.body.city;
    var price = req.body.cost;
    var hAddress = req.body.hotel_address;
    var cNumber = req.body.phone;

    collection.update( {  "hotel_name" : hname  },
    					{$set: {
                            "hotel_address" : hAddress,
                            "phone" : cNumber,
                            "cost" :price}},
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Update failed.");
                           }
                           else {
                        	   res.render('index', { "title": 'admin dashboard.',"message":'Destination details updated successfully' });
                           }
                       });

};