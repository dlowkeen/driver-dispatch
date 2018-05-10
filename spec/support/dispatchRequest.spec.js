const request = require("request-promise");

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

describe("dispatchRequest", function() {
  it("should dispatch a request and return a response", function() {
    expect(dispatchRequest(2, 3823958290)).not.toBeNull();
  });
});
