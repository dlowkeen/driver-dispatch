var fs = require("fs");
var request = require("request-promise");

fs.readFile("drivers.json", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
//   console.log(data);
});


request({
  method: "POST",
  uri: "https://backend-programming-challenge.herokuapp.com/driver/3/dispatch",
  json: true,
  body: {
    "shipmentId​": "2352839523"
  },
  headers: {
    "User-Agent": "Bolt Dispatch"
  }
}).then(console.log, console.log);