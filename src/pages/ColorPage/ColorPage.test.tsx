import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ColorPage } from "@src/pages/ColorPage/ColorPage";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<ColorPage></ColorPage>);

  return {
    container: container,
  };
};

describe("ColorPage.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the title of the APP, the form, the color input and the button to get the colors.", () => {
      const { container } = renderComponent();

      const headingApp = screen.getByRole("heading", {
        name: /color generator/i,
      });

      const form = container.querySelector("form") as HTMLFormElement;
      const inputColor = screen.getByRole("textbox");
      const getColorsButton = screen.getByRole("button", {
        name: /get colors/i,
      });

      expect(headingApp).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(inputColor).toBeInTheDocument();
      expect(getColorsButton).toBeInTheDocument();

      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
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

      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      expect(sectionColors?.children).toHaveLength(0);

      await user.click(getColorsButton);

      const sectionColorsRefresh = container.querySelector(".colors");

      expect(sectionColorsRefresh?.children).toHaveLength(21);
    });

    test("It must not render colors if input color has invalid value.", async () => {
      const { container } = renderComponent();

      const inputColor = screen.getByRole("textbox");
      await user.click(inputColor);
      await user.clear(inputColor);
      await user.keyboard("asdasdasd");

      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
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

      const sectionColors = container.querySelector(".colors");

      expect(sectionColors).toBeInTheDocument();
      expect(sectionColors?.children).toHaveLength(0);

      await user.click(getColorsButton);

      const sectionColorsRefresh = container.querySelector(
        ".colors"
      ) as HTMLElement;

      expect(sectionColorsRefresh?.children).toHaveLength(21);

      const colors = Array.from(document.querySelectorAll(".color"));
      const colorsWithTextLight = colors.filter((color) =>
        color.classList.contains("color--textlight")
      );

      expect(colorsWithTextLight).toHaveLength(10);
    });
  });
});
