import { useEffect } from "react";
import { useState } from "react";

export const Color = ({ rgb, weight, index, hexColor, inputNumber }) => {
  const rgbWithoutArray = rgb.join(",");
  const finalHexColor = `#${hexColor}`;
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <article
      className={`color ${index > inputNumber && "textlight"}`}
      style={{ backgroundColor: `rgb(${rgbWithoutArray})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(finalHexColor);
      }}
    >
      <p>{weight}%</p>
      <h2>{finalHexColor}</h2>
      {alert && <p>Copy to clipboard</p>}
    </article>
  );
};
