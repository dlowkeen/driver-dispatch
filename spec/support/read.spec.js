const fs = require('fs');

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
