import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ColorProps } from "@/types/props";

import Color from "@/components/Color/Color";

type RenderComponent = {
  props: ColorProps;
};

let mockWriteText: jest.Mock;

const renderComponent = (overrides?: Partial<ColorProps>): RenderComponent => {
  const props: ColorProps = {
    hexColor: "#ff0000",
    weight: 50,
    textLight: false,
    ...overrides,
  };

  render(<Color {...props} />);

  return { props };
};

describe("Color", () => {
  beforeEach(() => {
    mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  it("should render the weight percentage", () => {
    renderComponent();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("should render the hex color", () => {
    renderComponent();
    expect(screen.getByText("#ff0000")).toBeInTheDocument();
  });

  it("should have role button with accessible name", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Copy #ff0000 to clipboard" })).toBeInTheDocument();
  });

  it("should have aria-pressed false initially", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /Copy/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("should apply color--textlight class when textLight is true", () => {
    renderComponent({ textLight: true });
    expect(screen.getByRole("button", { name: /Copy/i })).toHaveClass("color--textlight");
  });

  it("should not apply color--textlight class when textLight is false", () => {
    renderComponent({ textLight: false });
    expect(screen.getByRole("button", { name: /Copy/i })).not.toHaveClass("color--textlight");
  });

  it("should show copied message after click", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: /Copy/i }));
    expect(await screen.findByText("Copied to clipboard")).toBeInTheDocument();
  });

  it("should call clipboard.writeText with the hex color on click", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Copy/i }));
    expect(mockWriteText).toHaveBeenCalledWith("#ff0000");
  });

  it("should show copied message after Enter key press", async () => {
    const user = userEvent.setup();
    renderComponent();
    screen.getByRole("button", { name: /Copy/i }).focus();
    await user.keyboard("{Enter}");
    expect(await screen.findByText("Copied to clipboard")).toBeInTheDocument();
  });
});
