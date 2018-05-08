class Calculator {
  add(a, b) {
    return a + b;
  }
}

describe("calculate addition", function() {
  var calculate = new Calculator();

  it("should be able to add two numbers together", function() {
    console.log("success!");
    console.log(calculate.add(1, 3));
    expect(calculate.add(1, 3)).toBe(4);
    expect(calculate.add(4, 4)).toEqual(8);
    expect(calculate.add(1, 1)).toBeLessThan(5);
  });
  it("should be able to declare the calculator class", function() {
    expect(calculate).toBeDefined();
    expect(calculate).not.toBeUndefined();
    expect(calculate).not.toBeNull();
  });
});
