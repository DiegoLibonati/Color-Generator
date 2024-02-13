import { useState } from "react";
import Values from "values.js";
import { Color } from "./components/Color";
import { FormDataColor, FormDataError } from "./entities/entities";
import "./App.css";

function App(): JSX.Element {
  const [colorArray, setColorArray] = useState<Values[]>([]);
  const [form, setForm] = useState<FormDataColor>({
    inputColor: "#ffffff",
    inputNumber: 10,
  });
  const [errors, setErrors] = useState<FormDataError>({
    errorColor: false,
    errorNumber: false,
  });

  const { inputColor, inputNumber } = form;

  const { errorColor, errorNumber } = errors;

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      const color = new Values(inputColor);
      const palleteColor = color.all(inputNumber);
      setErrors({
        errorColor: false,
        errorNumber: false,
      });
      setColorArray(palleteColor);
    } catch (e) {
      if (e instanceof Error) {
        setErrors({
          errorColor: true,
          errorNumber: false,
        });
      }

      if (e instanceof RangeError) {
        setErrors({
          errorColor: false,
          errorNumber: true,
        });
      }
    }
  };

  return (
    <main className="main_container">
      <section className="header_container">
        <article className="header_container_center">
          <h2>Color Generator</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={inputColor}
              name="inputColor"
              className={`input ${errorColor && "error"}`}
              onChange={(e) => handleInputValue(e)}
            ></input>
            <input
              type="number"
              className={`input ${errorNumber && "error"}`}
              value={inputNumber}
              name="inputNumber"
              onChange={(e) => handleInputValue(e)}
            ></input>
            <button type="submit">GET COLORS</button>
          </form>
        </article>
      </section>

      <section className="colors_container">
        {colorArray.map((color, index) => (
          <Color
            {...color}
            key={index * 50}
            index={index}
            hexColor={color.hex}
            inputNumber={inputNumber}
          ></Color>
        ))}
      </section>
    </main>
  );
}

export default App;
