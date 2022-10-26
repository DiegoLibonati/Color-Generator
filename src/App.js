import { useState } from "react";
import Values from "values.js";
import "./App.css";
import { Color } from "./components/Color";

function App() {
  const [form, setForm] = useState({
    inputColor: "#ffffff",
    inputNumber: 10,
  });

  const { inputColor, inputNumber } = form;

  const [colorArray, setColorArray] = useState([]);
  const [errors, setErrors] = useState({
    errorColor: false,
    errorNumber: false,
  });

  const { errorColor, errorNumber } = errors;

  const handleInputValue = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e, inputColor, inputNumber) => {
    e.preventDefault();

    try {
      const color = new Values(inputColor);
      const palleteColor = color.all(parseInt(inputNumber));
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
    <>
      <main className="main_container">
        <section className="header_container">
          <article className="header_container_center">
            <h2>Color Generator</h2>
            <form onSubmit={(e) => handleSubmit(e, inputColor, inputNumber)}>
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
    </>
  );
}

export default App;
