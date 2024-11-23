import { rgbToHex } from "./rgbToHex";

test("Verify color in hexadecimal.", () => {
  const expectedHexColor = "#835D83";
  const receivedRgbColor = "rgb(131, 93, 131)";

  const receivedHexColor = rgbToHex(receivedRgbColor);
  expect(receivedHexColor).toBe(expectedHexColor);
});
