import { rgbToHex } from "@/helpers/rgbToHex";

describe("rgbToHex", () => {
  it("should convert RGB values to uppercase hex", () => {
    expect(rgbToHex("rgb(255, 0, 0)")).toBe("#FF0000");
  });

  it("should return #FFFFFF for white", () => {
    expect(rgbToHex("rgb(255, 255, 255)")).toBe("#FFFFFF");
  });

  it("should return #000000 for black", () => {
    expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
  });

  it("should pad single-digit hex values with a leading zero", () => {
    expect(rgbToHex("rgb(0, 15, 255)")).toBe("#000FFF");
  });
});
