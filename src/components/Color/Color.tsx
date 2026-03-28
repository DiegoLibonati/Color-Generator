import { useState, useEffect } from "react";

import { ColorProps } from "@/types/props";

import "@/components/Color/Color.css";

const Color = ({ weight, hexColor, textLight }: ColorProps) => {
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
      role="button"
      tabIndex={0}
      aria-label={`Copy ${hexColor} to clipboard`}
      aria-pressed={alert}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setAlert(true);
          navigator.clipboard.writeText(hexColor);
        }
      }}
    >
      <p className="color__weight">{weight}%</p>
      <h2 className="color__hex-color">{hexColor}</h2>
      {alert && <p className="color__copy-clipboard">Copied to clipboard</p>}
    </article>
  );
};

export default Color;
