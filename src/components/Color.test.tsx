import { act } from "react";

import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Color } from "./Color";
import { rgbToHex } from "../helpers/rgbToHex";

type RenderComponent = {
  props: {
    weight: number;
    hexColor: string;
    textLight: boolean;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    weight: 10,
    hexColor: "#CECECE",
    textLight: false,
  };

  const { container } = render(
    <Color
      weight={props.weight}
      hexColor={props.hexColor}
      textLight={props.textLight}
    ></Color>
  );

  return {
    props: props,
    container: container,
  };
};

describe("Color.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the article, the weight, the hex color and should not render the alert.", () => {
      const { props } = renderComponent();

      const article = screen.getByRole("article");
      const weight = screen.getByText(`${props.weight}%`);
      const hexColor = screen.getByRole("heading", {
        name: props.hexColor,
      });
      const alert = screen.queryByText(/copy to clipboard/i);

      expect(article).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(hexColor).toBeInTheDocument();
      expect(alert).not.toBeInTheDocument();
    });

    test("You must render the article with the hex color and the relevant classes.", () => {
      const { props } = renderComponent();

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
      expect(rgbToHex(article.style.backgroundColor)).toBe(props.hexColor);
      expect(article.classList.contains("color")).toBeTruthy();
      expect(article.classList.contains("color--textlight")).toBeFalsy();
    });

    test("It should copy the hex color to the clipboard and also show the alert when the article is clicked on.", async () => {
      const userEvent = user.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      jest.useFakeTimers();

      renderComponent();

      const article = screen.getByRole("article");
      const alert = screen.queryByText(/copy to clipboard/i);

      expect(article).toBeInTheDocument();
      expect(alert).not.toBeInTheDocument();

      await userEvent.click(article);

      const alertCopy = screen.getByText(/copy to clipboard/i);

      expect(alertCopy).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(alertCopy).not.toBeInTheDocument();

      jest.useRealTimers();
    });
  });
});
