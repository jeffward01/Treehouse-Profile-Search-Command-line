//This file acturally 'calls' the application
//in console:
//Type:  node app.js {account name}
//V.2 || Type node app.js {language} {account name}




var profile = require("./profile.js");

//Turned off (for development use only)
//List directory (console input) array search
//console.dir(process.argv);

//Search Function
console.log("\n"+ "\n" + "Searching....." + "\n"+ "\n");
//Assign Varibles to console input
var subj = process.argv[2]
var users = process.argv.slice(3);

//Get values for console input || Uses the get method, see profile.js documentation.
users.forEach(function(currentValue){
profile.get(currentValue, subj);
});

//    ["jeffward2","joykesten2","chalkers", "davemcfarland"];






//Extra Practice/Notes:
//https://teamtreehouse.com/community/problem-coding-nodejs-extra-credit-challenge-forecastio-command-line-app


//Slower
//user.forEach(function(username){
//  profile.get(username);
//});


//profile.get("jeffward2");
//profile.get("joykesten2");
//profile.get("chalkers");
