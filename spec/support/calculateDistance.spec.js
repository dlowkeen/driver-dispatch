const geolib = require("geolib");
const pointA = { latitude: 34.048, longitude: -118.302 };
const pointB = { latitude: 34.009, longitude: -118.289 };


calculateDistance = (a, b) => {

  let distance = geolib.getDistance(a, b);
  return distance;

};

describe("calculateDistance", function() {
  it("should calculate the distance in meters between two points", function() {

    expect(calculateDistance(pointA, pointB)).not.toBeNaN();
    expect(calculateDistance(pointA, pointB)).toEqual(4490);

  })
})