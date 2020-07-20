const favoriteReducer = require('../src/redux/reducers/favoriteReducer');

test('Reducer will return default state if state is undefined', () => {
  const result = favoriteReducer(undefined, {});
  expect(typeof (result)).toBe(typeof ([]));
  expect(result.length).toBe(0);
});

test("Reducer adds a value to the array correctly", () => {
  const result = favoriteReducer([], { type: "SET_FAVORITES", payload: [{name: "Buffalo Wild Wings", address: "1234 5th st", rating: 4 }] });
  expect(typeof result).toBe(typeof []);
  expect(result.length).toBe(1);
  expect(result[0].name).toBe("Buffalo Wild Wings");
  expect(result[0].address).toBe("1234 5th st");
  expect(result[0].rating).toBe(4);
});
