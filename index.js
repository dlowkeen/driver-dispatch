const fs = require("fs");
const request = require("request-promise");
const geolib = require("geolib");

getDrivers = (fileName) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                reject(error);
            }
            resolve(data);
        })
    });
}

getShipments = (fileName) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, "utf8", function(error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        })
    })
}

calculateDistance = (pkgLocation) => {

    let driverDistanceArray = [];
    const drivers = require("./drivers.json");
    // compute distance from various drivers to package
    for (let i = 2; i < Object.keys(drivers).length + 1; i++) {
        let driverLocation = drivers[i].coordinates;
        let shipmentLocation = pkgLocation;
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
    // console.log("Sorted Array", sortedArr);
    return sortedArr;
}

// function to compare distances from driver and shipment
compare = (a, b) => {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

dispatchRequest = (driverId, shipment) => {
    console.log(driverId);
    console.log(shipment);
    // const shipment = {
    //     "shipmentId​": "2352839523"
    //   }
    request({
      method: "POST",
      uri: "https://backend-programming-challenge.herokuapp.com/driver/" + driverId + "/dispatch",
      json: true,
      body: shipment,
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
main = async () => {

    // read drivers.json
    const drivers = await getDrivers("drivers.json");
    // read shipments.json
    const shipments = await getShipments("shipments.json");

    // iterate through shipments to create more accessible array
    let json = JSON.parse(shipments);
    var keys = [];
    for (let shipment in json) {
        if (json.hasOwnProperty(shipment)) {
            keys.push(shipment);
        } 
        console.log("shipment", shipment);
    }

    // loop through keys array and calculate distance from drivers to each shipment
    for (var i = 0; i <keys.length; i++) {
        let shipmentId = keys[i];
        let pkgLocation = json[keys[i]].coordinates;
        
        let sortedDistanceArr = calculateDistance(pkgLocation);
        // console.log("sortedDistanceArr", sortedDistanceArr);
        let closestDriver = sortedDistanceArr[0].driver;
        console.log("closest driver to package " + shipmentId + " is driver " + closestDriver);
        
        // dispatch to drivers
        // dispatchRequest(closestDriver, shipmentId);
        // if no acceptances, dispatch to next driver. 
    }
}

main();