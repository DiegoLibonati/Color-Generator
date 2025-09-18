import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "@src/App";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<App></App>);

  return {
    container: container,
  };
};

describe("App.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the title of the APP, the form, the color input and the button to get the colors.", () => {
      const { container } = renderComponent();

      const headingApp = screen.getByRole("heading", {
        name: /color generator/i,
      });
      // eslint-disable-next-line
      const form = container.querySelector("form") as HTMLFormElement;
      const inputColor = screen.getByRole("textbox");
      const getColorsButton = screen.getByRole("button", {
        name: /get colors/i,
      });

      expect(headingApp).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(inputColor).toBeInTheDocument();
      expect(getColorsButton).toBeInTheDocument();

      // eslint-disable-next-line
      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      // eslint-disable-next-line
      expect(sectionColors?.children).toHaveLength(0);
    });

    test("It should render the amount of colors entered when you click the button to get the colors.", async () => {
      const { container } = renderComponent();

      const inputColor = screen.getByRole("textbox");
      const getColorsButton = screen.getByRole("button", {
        name: /get colors/i,
      });

      await user.click(inputColor);
      await user.clear(inputColor);
      await user.keyboard("#09f");

      // eslint-disable-next-line
      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      // eslint-disable-next-line
      expect(sectionColors?.children).toHaveLength(0);

      await user.click(getColorsButton);

      // eslint-disable-next-line
      const sectionColorsRefresh = container.querySelector(".colors");

      // eslint-disable-next-line
      expect(sectionColorsRefresh?.children).toHaveLength(21);
    });

    test("It must not render colors if input color has invalid value.", async () => {
      const { container } = renderComponent();

      const inputColor = screen.getByRole("textbox");
      await user.click(inputColor);
      await user.clear(inputColor);
      await user.keyboard("asdasdasd");

      // eslint-disable-next-line
      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      // eslint-disable-next-line
      expect(sectionColors?.children).toHaveLength(0);
    });

    test("It must render the color cards with the hexColor with the relevant 'textLight' depending on the index.", async () => {
      const { container } = renderComponent();

      const inputColor = screen.getByRole("textbox");
      const getColorsButton = screen.getByRole("button", {
        name: /get colors/i,
      });

      await user.click(inputColor);
      await user.clear(inputColor);
      await user.keyboard("#09f");

      // eslint-disable-next-line
      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      // eslint-disable-next-line
      expect(sectionColors?.children).toHaveLength(0);

      await user.click(getColorsButton);

      // eslint-disable-next-line
      const sectionColorsRefresh = container.querySelector(
        ".colors"
      ) as HTMLElement;

      // eslint-disable-next-line
      expect(sectionColorsRefresh?.children).toHaveLength(21);

      // eslint-disable-next-line
      const colors = Array.from(document.querySelectorAll(".color"));
      const colorsWithTextLight = colors.filter((color) =>
        color.classList.contains("color--textlight")
      );

      expect(colorsWithTextLight).toHaveLength(10);
    });
  });
});
