/**
 * http://usejsdoc.org/
 */
var lineReader = require('line-reader');
var path = require('path');
var registeredUsers = [];
var request = require('request');

/**
 * Send the contents of an HTML page to the client.
 * @param fileName the name of the file containing the HTML page.
 * @param result the HTTP result.
 */
function sendPage(fileName, result)
{
    var html = '';

    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n';

            if (last)
            {
                result.send(html);
                return false;
            }
            else
            {
                return true;
            }
        });
}


/*
 * GET home page.
 */

module.exports.home = function(req,res)
{
	res.render('landing');

};

//Get registration page
module.exports.register = function(req,res)
{
	

};

//Get login page
module.exports.login = function(req,res)
{
	res.render('login');

};

//Get dashboard page
module.exports.dashboard = function(req,res)
{

};

module.exports.postRegister = function(req,res)
{

    var existingUser = registeredUsers.filter(function(user)
    {
    	return user.emailAddress === req.body.emailAddress;
    });


    if (existingUser.length > 0)
    {
    	//res.render('error.jade',{message: 'User already exists!!!'})
		res.send("User Already exists! Please login with your credentials");
    }


    else
    {
    	var user = {    firstName: req.body.firstName,
    					lastName: req.body.lastName,
    					emailAddress: req.body.emailAddress,
    					phoneNumber: req.body.phoneNumber,
    					password: req.body.password
                      };
    	registeredUsers.push(user);
    	console.log(req.body);
    	res.redirect('/');
    }
};

module.exports.postLogin = function(req,res)
{
    var matches = registeredUsers.filter(function(user)
                  {
                      return    (((user.emailAddress === req.body.emailAddress))
                             && (user.password === req.body.password));
                  });


    if (matches.length === 0)
    {
		res.send("Invalid credentials..Please register before login !! ");

    }
    else
    {
    	res.render('loggedin', { name: matches[0].firstName});
    }
};
