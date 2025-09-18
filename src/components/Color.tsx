import { useState, useEffect } from "react";

import "@src/components/Color.css";

interface ColorProps {
  weight: number;
  hexColor: string;
  textLight: boolean;
}

export const Color = ({
  weight,
  hexColor,
  textLight,
}: ColorProps): JSX.Element => {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      className={`color ${textLight && "color--textlight"}`}
      style={{ backgroundColor: hexColor }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexColor);
      }}
    >
      <p className="color__weight">{weight}%</p>
      <h2 className="color__hex-color">{hexColor}</h2>
      {alert && <p className="color__copy-clipboard">Copy to clipboard</p>}
    </article>
  );
};
