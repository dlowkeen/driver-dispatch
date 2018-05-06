const fs = require("fs");
const request = require("request-promise");
const geolib = require("geolib");

getDrivers = (fileName, type) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                reject(error);
            }
            resolve(data);
            // We will then print the contents of data
        })
        
    });
}

getShipments = () => {
    fs.readFile("shipments.json", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // print out contents of data
        console.log(data);
    })
}

calculateDistance = () => {
    let driverDistanceArray = [];
    const drivers = require("./drivers.json");
    // compute distance from various drivers to package
    for (let i = 1; i < Object.keys(drivers).length + 1; i++) {
        let driverLocation = drivers[i].coordinates;
        let shipmentLocation = {"latitude": 34.0375, "longitude": -118.249};
    
        let distance = geolib.getDistance(
            driverLocation,
            shipmentLocation
        )
        
        let driverDistanceObject = {
            driver: [i],
            distance: distance
        }
        
        // push to an array
        driverDistanceArray.push(driverDistanceObject);
    }
    // console.log("driver distance array", driverDistanceArray);

    // sort array closest to farther
    let sortedArr = driverDistanceArray.sort(compare);
    // output is a sorted array of closest drivers
    console.log("Sorted Array", sortedArr);
}

// function to compare distances from driver and shipment
compare = (a, b) => {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

dispatchRequest = (driverId) => {
    request({
      method: "POST",
      uri: "https://backend-programming-challenge.herokuapp.com/driver/" + driverId + "/dispatch",
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

main = async () => {
    const drivers = await getDrivers("drivers.json", "sample");
    console.log("Drivers", drivers);
}

// ******************* Main application
// read shipments.json
    // getShipments();
// read drivers.json
    // getDrivers();
// nest drivers loop into shipments loop
// initiate shipment dispatching process, grab first package
    // calculateDistance(); 
// dispatch to drivers
    // dispatchRequest(2);
// if no acceptances, dispatch to next driver. 

main();