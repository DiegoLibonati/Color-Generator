import { rgbToHex } from "@/helpers/rgbToHex";

describe("rgbToHex", () => {
  describe("when converting standard rgb values", () => {
    it("should convert red to #FF0000", () => {
      expect(rgbToHex("rgb(255, 0, 0)")).toBe("#FF0000");
    });

    it("should convert green to #00FF00", () => {
      expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00FF00");
    });

    it("should convert blue to #0000FF", () => {
      expect(rgbToHex("rgb(0, 0, 255)")).toBe("#0000FF");
    });

    it("should convert black to #000000", () => {
      expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    it("should convert white to #FFFFFF", () => {
      expect(rgbToHex("rgb(255, 255, 255)")).toBe("#FFFFFF");
    });
  });

  describe("when values require hex padding", () => {
    it("should pad single digit hex values with a leading zero", () => {
      expect(rgbToHex("rgb(0, 1, 15)")).toBe("#00010F");
    });

    it("should handle values that produce a two-digit hex without padding", () => {
      expect(rgbToHex("rgb(16, 255, 128)")).toBe("#10FF80");
    });
  });

  describe("output format", () => {
    it("should always return an uppercase hex string", () => {
      const result = rgbToHex("rgb(171, 205, 239)");
      expect(result).toBe(result.toUpperCase());
    });

    it("should always start with a hash symbol", () => {
      expect(rgbToHex("rgb(100, 150, 200)")).toMatch(/^#/);
    });

    it("should always return a 7-character string", () => {
      expect(rgbToHex("rgb(100, 150, 200)")).toHaveLength(7);
    });
  });
});
