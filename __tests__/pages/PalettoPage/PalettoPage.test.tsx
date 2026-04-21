import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Values from "values.js";

import type { RenderResult } from "@testing-library/react";

import PalettoPage from "@/pages/PalettoPage/PalettoPage";

const MockValues = Values as unknown as jest.Mock;

const mockColors: {
  hex: string;
  weight: number;
}[] = [
  { hex: "ff0000", weight: 100 },
  { hex: "ffffff", weight: 0 },
];

jest.mock("values.js");

const renderPage = (): RenderResult => render(<PalettoPage />);

describe("PalettoPage", () => {
  beforeEach(() => {
    MockValues.mockImplementation(() => ({
      all: (): {
        hex: string;
        weight: number;
      }[] => mockColors,
    }));
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Paletto" })).toBeInTheDocument();
    });

    it("should render the color input with the default value", () => {
      renderPage();
      expect(screen.getByRole("textbox", { name: "Hex color value" })).toHaveValue("#ffffff");
    });

    it("should render the submit button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "GET COLORS" })).toBeInTheDocument();
    });

    it("should render no color cards initially", () => {
      renderPage();
      expect(
        screen.queryByRole("button", { name: /Copy .* to clipboard/ })
      ).not.toBeInTheDocument();
    });

    it("should not show the input in error state initially", () => {
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });
      expect(input).toHaveAttribute("aria-invalid", "false");
      expect(input).not.toHaveClass("header-content__form-input--error");
    });
  });

  describe("behavior", () => {
    it("should update the input value when the user types", async () => {
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });
      await user.clear(input);
      await user.type(input, "#123456");
      expect(input).toHaveValue("#123456");
    });

    it("should render color cards after a valid color is submitted", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(screen.getByRole("button", { name: "Copy #ff0000 to clipboard" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Copy #ffffff to clipboard" })).toBeInTheDocument();
    });

    it("should render one card for each color in the palette", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      const colorCards = screen.getAllByRole("button", { name: /Copy .* to clipboard/ });
      expect(colorCards).toHaveLength(mockColors.length);
    });

    it("should show the input in error state when an invalid color is submitted", async () => {
      MockValues.mockImplementation(() => {
        throw new Error("Invalid color value");
      });
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });
      await user.clear(input);
      await user.type(input, "invalid");
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveClass("header-content__form-input--error");
    });

    it("should show the error description when an invalid color is submitted", async () => {
      MockValues.mockImplementation(() => {
        throw new Error("Invalid color value");
      });
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });
      await user.clear(input);
      await user.type(input, "invalid");
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(
        screen.getByText("Invalid hex color. Please enter a valid hex color code.")
      ).toBeInTheDocument();
    });

    it("should not render color cards when an invalid color is submitted", async () => {
      MockValues.mockImplementation(() => {
        throw new Error("Invalid color value");
      });
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });
      await user.clear(input);
      await user.type(input, "invalid");
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(
        screen.queryByRole("button", { name: /Copy .* to clipboard/ })
      ).not.toBeInTheDocument();
    });

    it("should clear the error state after a valid color is submitted", async () => {
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox", { name: "Hex color value" });

      MockValues.mockImplementation(() => {
        throw new Error("Invalid color value");
      });
      await user.clear(input);
      await user.type(input, "invalid");
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(input).toHaveAttribute("aria-invalid", "true");

      MockValues.mockImplementation(() => ({
        all: (): {
          hex: string;
          weight: number;
        }[] => mockColors,
      }));
      await user.clear(input);
      await user.type(input, "#ffffff");
      await user.click(screen.getByRole("button", { name: "GET COLORS" }));
      expect(input).toHaveAttribute("aria-invalid", "false");
    });
  });
});
