import { useState } from "react";
import Values from "values.js";

import { Color } from "./components/Color";

import { FormDataColor, FormDataError } from "./entities/entities";

import "./App.css";

function App(): JSX.Element {
  const [colors, setColors] = useState<Values[]>([]);
  const [form, setForm] = useState<FormDataColor>({
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
    <main className="main">
      <section className="header">
        <article className="header__wrapper">
          <h2>Color Generator</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id="inputColor"
              type="text"
              value={inputColor}
              name="inputColor"
              className={`input ${errorColor && "error"}`}
              onChange={(e) => handleInputValue(e)}
            ></input>
            <button type="submit" aria-label="get colors">
              GET COLORS
            </button>
          </form>
        </article>
      </section>

      <section className="colors">
        {colors.map((color, index) => (
          <Color
            key={index * 50}
            hexColor={`#${color.hex}`}
            weight={color.weight}
            textLight={
              index >
              colors.length -
                1 -
                colors.indexOf(colors.find((color) => color.weight === 0)!)
            }
          ></Color>
        ))}
      </section>
    </main>
  );
}

export default App;
