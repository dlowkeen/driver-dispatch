const fs = require("fs");
const request = require("request-promise");

fs.readFile("drivers.json", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
//   console.log(data);
  
});

calculateDistance = () => {
// compute distance from various drivers to package
// push to an array & sort array closest to farther
// output is a sorted array of closest drivers
}


dispatchRequest = () => {
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
    }, (error, response, body) => {
        console.log("Body", body);
        // if accepted, console.log("Driver __ accepted package __");
        // else dispatchRequest to new driver
    });
    // .then(console.log, console.log);
}

// ******************* Main application
// read drivers.json
// read shipments.json
// initiate shipment dispatching process, grab first package
// calculateDistance(); 
// dispatch to drivers();
// if no acceptances, dispatch to next driver. 
