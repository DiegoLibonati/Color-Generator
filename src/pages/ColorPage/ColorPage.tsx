import { useState } from "react";
import Values from "values.js";

import type { JSX } from "react";

import Color from "@/components/Color/Color";

import type { FormDataError } from "@/types/forms";

import "@/pages/ColorPage/ColorPage.css";

const ColorPage = (): JSX.Element => {
  const [colors, setColors] = useState<Values[]>([]);
  const [form, setForm] = useState({
    inputColor: "#ffffff",
  });
  const [errors, setErrors] = useState<FormDataError>({
    errorColor: false,
  });

  const { inputColor } = form;

  const { errorColor } = errors;

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      const color = new Values(inputColor);
      const palleteColors = color.all();

      setErrors({
        errorColor: false,
      });
      setColors(palleteColors);
    } catch (e) {
      if (e instanceof Error) {
        setErrors({
          errorColor: true,
        });
      }
    }
  };

  return (
    <main className="color-page" aria-label="Color Generator application">
      <section className="header-wrapper" aria-label="Color input">
        <article className="header-content">
          <h2 className="header-content__title">Color Generator</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="header-content__form"
            aria-label="Generate color palette"
          >
            <input
              id="inputColor"
              type="text"
              value={inputColor}
              name="inputColor"
              className={`header-content__form-input ${
                errorColor && "header-content__form-input--error"
              }`}
              onChange={(e) => {
                handleInputValue(e);
              }}
              aria-label="Hex color value"
              aria-invalid={errorColor}
              aria-describedby={errorColor ? "inputColor-error" : undefined}
              placeholder="#ffffff"
            ></input>
            {errorColor && (
              <span id="inputColor-error" className="visually-hidden">
                Invalid hex color. Please enter a valid hex color code.
              </span>
            )}
            <button type="submit" className="header-content__form-submit">
              GET COLORS
            </button>
          </form>
        </article>
      </section>

      <section className="colors" aria-label="Generated color palette" aria-live="polite">
        {colors.map((color, index) => (
          <Color
            key={index * 50}
            hexColor={`#${color.hex}`}
            weight={color.weight}
            textLight={
              index >
              colors.length - 1 - colors.indexOf(colors.find((color) => color.weight === 0)!)
            }
          ></Color>
        ))}
      </section>
    </main>
  );
};

export default ColorPage;
