const fs = require('fs');
const request = require("request-promise");

describe("ReadFile", function() {
  let content = null;

  beforeEach(function(done) {
    fs.readFile("drivers.json", "utf8", function(error, data) {
      if (error) {
        console.log("error", error);
      } else {
        content = data;
        done(content);
      }
    });
  });

  it("should read the content of the file", function() {
    expect(content).not.toBeNull()
    expect(content).not.toBeUndefined();
  })
})

function compare (a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

describe("compare", function() {

  it("should compare the two numbers", function() {
    expect(compare(1, 3)).toEqual(-1);
    expect(compare(5,4)).toEqual(1);
    expect(compare(1, 1)).toEqual(0);
    expect(compare(0,0)).not.toBeUndefined();
    expect(compare(-1,-1)).not.toBeNull();
  });
  
});

function modulusChecker (counter) {
  let modulus = counter % 3;
  return modulus;
  // if (modulus == 0) {
  //   setTimeout(() => {
  //     resolve("multiple of 3");
  //   }, 10000);
  // }
}

describe("modulusChecker", function() {

  it("should check to see if the number is a multiple of three", function() {
    expect(modulusChecker(4)).toEqual(1);
  })
})

dispatchRequest = (driverId, shipmentId) => {
  let promise = new Promise(function(reject, resolve) {
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
      console.log("Body", body);
      resolve(body);
    });
  });
  return promise;
};

describe("dispatchRequest", function () {

  it("should dispatch a request and return a response", function() {
    expect(dispatchRequest(2, 3823958290)).not.toBeNull();
  })
})