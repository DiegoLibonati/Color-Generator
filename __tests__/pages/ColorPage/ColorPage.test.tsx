import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Values from "values.js";

import ColorPage from "@/pages/ColorPage/ColorPage";

interface RenderPage {
  container: HTMLElement;
}

const mockValuesAll = jest.fn();

jest.mock("values.js");

const renderPage = (): RenderPage => {
  (Values as jest.Mock).mockImplementation(() => ({
    all: mockValuesAll.mockReturnValue([
      { hex: "ff0000", weight: 0 },
      { hex: "ff8888", weight: 50 },
    ]),
  }));
  const { container } = render(<ColorPage />);
  return { container };
};

describe("ColorPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page title", () => {
    renderPage();
    expect(screen.getByText("Color Generator")).toBeInTheDocument();
  });

  it("should render the color input with its initial value", () => {
    renderPage();
    expect(screen.getByRole("textbox", { name: "Hex color value" })).toHaveValue("#ffffff");
  });

  it("should render the submit button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /get colors/i })).toBeInTheDocument();
  });

  it("should render color cards after a valid submission", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: /get colors/i }));
    const colorCards = await screen.findAllByRole("button", { name: /Copy .* to clipboard/i });
    expect(colorCards).toHaveLength(2);
  });

  it("should set aria-invalid on the input when submission fails", async () => {
    const user = userEvent.setup();
    renderPage();
    (Values as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Invalid color");
    });
    await user.click(screen.getByRole("button", { name: /get colors/i }));
    expect(screen.getByRole("textbox", { name: "Hex color value" })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("should clear aria-invalid after a successful submission following an error", async () => {
    const user = userEvent.setup();
    renderPage();
    (Values as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Invalid color");
    });
    await user.click(screen.getByRole("button", { name: /get colors/i }));
    await user.click(screen.getByRole("button", { name: /get colors/i }));
    expect(screen.getByRole("textbox", { name: "Hex color value" })).toHaveAttribute(
      "aria-invalid",
      "false"
    );
  });
});
