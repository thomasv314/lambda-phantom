'use strict';

var Horseman = require ('node-horseman')
var path = require('path')

module.exports.phantom = (event, context, callback) => {
  var current = path.resolve(process.cwd(), '.');
  var horseman = new Horseman({phantomPath: current + "/bin/phantomjs" })

  horseman
    .open('http://www.google.com')
    .type('input[name="q"]', 'github')
    .click("button:contains('Google Search')")
    .waitForNextPage()
    .count("li.g")
    .then(function(numLinks){
      console.log("Number of links: " +numLinks);
      horseman.close();
      callback(null, { numLinks: numLinks })
    });
};
