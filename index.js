const fs = require("fs");
const request = require("request-promise");
const geolib = require("geolib");
// counter for dispatchShipment function
// TO-DO: remove counter and pass to function as a parameter
let counter = 0;

getDrivers = fileName => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

getShipments = fileName => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, "utf8", function(error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

calculateDistance = (shipmentLocation, drivers) => {
    let driverDistanceArray = [];
    // compute distance from various drivers to package
    let driversJson = JSON.parse(drivers);
    var keys = [];
    for (let driver in driversJson) {
        if (driversJson.hasOwnProperty(driver)) {
            keys.push(driver);
        }
    }
    for (var i = 0; i < keys.length; i++) {
        let driverId = keys[i];
        let driverLocation = driversJson[keys[i]].coordinates;
        let distance = geolib.getDistance(driverLocation, shipmentLocation);
        let driverDistanceObject = {
            driver: driverId,
            distance: distance
        };
        // push to an array
        driverDistanceArray.push(driverDistanceObject);
    }
    // sort array closest to farther
    let sortedArr = driverDistanceArray.sort(compare);
    // output is a sorted array of closest drivers
    return sortedArr;
};

// helper function to compare distances from driver and shipment
compare = (a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
};

dispatchRequest = (driverId, shipmentId) => {
    return new Promise(function(reject, resolve) {
        request({
            method: "POST",
            uri:
            "https://backend-programming-challenge.herokuapp.com/driver/" +
            driverId +
            "/dispatch",
            json: true,
            body: {
                shipmentId: shipmentId
            },
            headers: {
                "User-Agent": "Bolt Dispatch"
            }
        }).then((error, response, body) => {
            if (error) {
                reject(error);
            }
            // resolves the message that is sent back from request
            resolve(body);
        });
    });
};

dispatchShipment = async (keys, json, drivers) => {
  // console.log("keys", keys);
  // console.log("keys[0]", keys[0])
  let shipmentId = keys[0];
  let shipmentLocation = json[keys[0]].coordinates;
  let sortedDistanceArr = calculateDistance(shipmentLocation, drivers);
  let closestDriver = sortedDistanceArr[counter].driver;
  // dispatch package to closest driver
  //   setTimeout((dispatchRequest), 1500, closestDriver, parseInt(shipmentId));
  dispatch = await dispatchRequest(closestDriver, parseInt(shipmentId));
  // console.log("dispatch.response", dispatch.response);
  // console.log("dispatch", dispatch);
  if (dispatch.response === "Accepted") {
      console.log("DriverId " + closestDriver + " has " + dispatch.response + " the package.");
      // remove package that has already been dispatched
      keys = keys.slice(1);
      console.log("Remaining shipments", keys);
      // set counter to zero and begin dispatch process again
      counter = 0;
      console.log("counter", counter);
      dispatchShipment(keys, json, drivers);
    } else {
      counter++;
      console.log("counter", counter);
      console.log("driverId " + closestDriver + " Denied package request");
      let mod = await modulusChecker(counter);
      console.log("mod", mod);
      console.log("HEEEEEEEYYYYYYYY WE GOT PAST THE MODULUS CHECKER");
      dispatchShipment(keys, json, drivers);
  }
  if (sortedDistanceArr.length == counter) {
      console.log("All drivers denied package " + shipmentId);
      // remove shipment from list of available shipments   
      keys = keys.slice(1);
      dispatchShipment(keys, json, drivers);
  }
};

modulusChecker = (counter) => {
  return new Promise(function(resolve, reject) {
    let modulus = counter % 3;
    console.log("modulus", modulus);
    console.log("Waiting to dispatch to next available drivers");
    if (modulus == 2) {
      setTimeout(() => {
        resolve("Beginning Dispatch");
      }, 3000);
    } else {
      console.log("Dispatching Next Driver");
    }
  });
}

// ******************* Main application
main = async () => {
  // read drivers.json
  const drivers = await getDrivers("drivers.json");
  // read shipments.json
  const shipments = await getShipments("shipments.json");
  // iterate through shipments to create more accessible array
  let json = JSON.parse(shipments);
  let keys = [];
  for (let shipment in json) {
    if (json.hasOwnProperty(shipment)) {
      keys.push(shipment);
    }
  }
  
  // recursive function that iterates over keys and drivers 
  dispatchShipment(keys, json, drivers);
};

main();
