function modulusChecker(counter) {
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
  });
});
