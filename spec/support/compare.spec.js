function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

describe("compare", function() {
  it("should compare the two numbers", function() {
    expect(compare(1, 3)).toEqual(-1);
    expect(compare(5, 4)).toEqual(1);
    expect(compare(1, 1)).toEqual(0);
    expect(compare(0, 0)).not.toBeUndefined();
    expect(compare(-1, -1)).not.toBeNull();
  });
});
