var request = require('request');
var token = require('./Secret.js');
var fs = require('fs');
var authorising = 'token ' + token;


  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization' : authorising  
      }
    };
  
    request(options, function(err, res, body) {
      body = JSON.parse(body);
      cb(err, body);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
      for(let i = 0; i < result.length; i++ ) {
        downloadtheimagebyURL(result[i].avatar_url, './pictures/' + result[i].login + '.jpg');
      }
  
  });

  function downloadtheimagebyURL(url, filepath) {
    request.get(url)
    .pipe(fs.createWriteStream(filepath)); 
  }
  

console.log('Welcome to the GitHub Avatar Downloader!');
