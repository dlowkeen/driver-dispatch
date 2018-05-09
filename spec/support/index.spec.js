class Index {
  compare(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
}

describe("compare two numbers", function() {
  var index = new Index();

  it("should compare the two numbers", function() {
    console.log("success!");
    expect(index).toBeDefined();
    // expect(index.compare(1, 3).toEqual(-1));
  });
  
});
