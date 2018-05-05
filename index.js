const fs = require("fs");
const request = require("request-promise");
const geolib = require("geolib");

fs.readFile("drivers.json", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }
    // We will then print the contents of data
    //   console.log(data);
    
});


calculateDistance = () => {
    const drivers = require("./drivers.json");
    console.log(drivers[1].coordinates);
    console.log(Object.keys(drivers).length);
  // compute distance from various drivers to package
  let driverDistanceArray = [];
  for (let i = 1; i < Object.keys(drivers).length + 1; i++) {
    console.log("Drivers", drivers[i].coordinates);
  }
  console.log(driverDistanceArray);
  let driverLocation = {"latitude": 34.048, "longitude": -118.302};
  let shipmentLocation = {"latitude": 34.0375, "longitude": -118.249};

  let distance = geolib.getDistance(
    driverLocation,
    shipmentLocation
  )
  console.log("shipment is " + distance + " meters away.");

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
calculateDistance(); 
// dispatch to drivers();
// if no acceptances, dispatch to next driver. 
