import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ColorProps } from "@/types/props";

import Color from "@/components/Color/Color";

const renderComponent = (props: Partial<ColorProps> = {}): RenderResult => {
  const defaultProps: ColorProps = {
    weight: 50,
    hexColor: "#ff0000",
    textLight: false,
    ...props,
  };
  return render(<Color {...defaultProps} />);
};

describe("Color", () => {
  describe("rendering", () => {
    it("should render the weight as a percentage", () => {
      renderComponent({ weight: 75 });
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should render the hex color value", () => {
      renderComponent({ hexColor: "#ff0000" });
      expect(screen.getByText("#ff0000")).toBeInTheDocument();
    });

    it("should not show the copied to clipboard message initially", () => {
      renderComponent();
      expect(screen.queryByText("Copied to clipboard")).not.toBeInTheDocument();
    });

    it("should apply the color--textlight class when textLight is true", () => {
      renderComponent({ textLight: true });
      expect(screen.getByRole("button")).toHaveClass("color--textlight");
    });

    it("should not apply the color--textlight class when textLight is false", () => {
      renderComponent({ textLight: false });
      expect(screen.getByRole("button")).not.toHaveClass("color--textlight");
    });

    it("should set the background color to the provided hex color", () => {
      renderComponent({ hexColor: "#00ff00" });
      expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "#00ff00" });
    });

    it("should have aria-pressed set to false initially", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    });

    it("should have the correct aria-label", () => {
      renderComponent({ hexColor: "#ff0000" });
      expect(screen.getByRole("button", { name: "Copy #ff0000 to clipboard" })).toBeInTheDocument();
    });

    it("should be keyboard focusable", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("tabindex", "0");
    });
  });

  describe("behavior", () => {
    it("should show the copied to clipboard message after clicking", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();
    });

    it("should call clipboard writeText with the hex color when clicked", async () => {
      const user = userEvent.setup();
      const writeTextSpy = jest
        .spyOn(navigator.clipboard, "writeText")
        .mockResolvedValue(undefined);
      renderComponent({ hexColor: "#abc123" });
      await user.click(screen.getByRole("button"));
      expect(writeTextSpy).toHaveBeenCalledWith("#abc123");
    });

    it("should set aria-pressed to true after clicking", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    });

    it("should show the copied to clipboard message after pressing Enter", async () => {
      const user = userEvent.setup();
      renderComponent();
      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();
    });

    it("should show the copied to clipboard message after pressing Space", () => {
      renderComponent();
      fireEvent.keyDown(screen.getByRole("button"), { key: " " });
      expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();
    });

    it("should hide the copied to clipboard message after 3 seconds", async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(screen.queryByText("Copied to clipboard")).not.toBeInTheDocument();
      jest.useRealTimers();
    });
  });
});
