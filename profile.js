//Problem: we need a simple way to look at a user's badge count and Javascript points
//Solution: Use node.js to connect to Treehouse's API to get progile information and print out

var http = require("http");


var subjects;
var profile;

//Print out message
function printMessage(username, badgeCount, points, subj) {
  var message = "...Your search is done... Your search result below: \n \n";
  message += username + " has " + badgeCount + " total badge(s) and " + points + " points in " + subj + "." + "\n" + "\n";
  message += "--------------------------------------------------------------------------------------------" + "\n"
  //Error check
  if (points === undefined) {
    console.error("\n" + " The subject:(" + subj + ") does not exist.  Please choose a valid subject. Subjects are case senitive.  Here is a subject list: " + printSubjectsList() + "Please enter in console:" +"\n"+"node app.js {subject} {treehouse account ID}");
    return false;
  } else {
    //If no error, print out message
    console.log(message);
  }
}

//Print out Error messages
function printError(error) {
  console.error(error.message + "<----  error has occured!. Oh Nooz!");
}

//Main function doing the work.
function get(username, subj) {

  //Connect to API URL (http://teamtreehouse.com/username.json)
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function (response) {
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on("end", function () {
      if (response.statusCode === 200) {
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Removes the 'total' object key from subjects
          subjects = Object.keys(profile.points).splice(1);
          //Print the data out
          printMessage(username, profile.badges.length, profile.points[subj], subj);
        } catch (error) {
          //Parese Error
          printError(error);
        }
      } else {
        printError({
          message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"
        });
      }

    });
  });
  //Check for connection error
  request.on("error", printError);
}



//Build list of subjects
function printSubjectsList() {
  var subjectList = "\n" + "\n";
  subjects.forEach(function (subject) {
    subjectList += subject + "\n";
    
  })
  subjectList += "\n";
  return subjectList;
}


module.exports.get = get;
