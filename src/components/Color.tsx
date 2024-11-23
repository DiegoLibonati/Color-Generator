import { useState, useEffect } from "react";

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
      className={`color ${textLight && "textlight"}`}
      style={{ backgroundColor: hexColor }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexColor);
      }}
    >
      <p>{weight}%</p>
      <h2>{hexColor}</h2>
      {alert && <p>Copy to clipboard</p>}
    </article>
  );
};
