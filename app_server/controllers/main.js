/**
 * http://usejsdoc.org/
 */
var lineReader = require('line-reader');
var path = require('path');
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
	res.render('register');
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

//Get buy search page
module.exports.buySearch = function(req,res)
{
	res.render('buySearch');

};


//Details of searched/selected property
module.exports.propertyDetails = function(req,res)
{
	res.render('propertyDetails');

};
