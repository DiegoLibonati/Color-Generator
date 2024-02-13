// Types

export type FormDataColor = {
  inputColor: string;
  inputNumber: number;
};

export type FormDataError = {
  errorColor: boolean;
  errorNumber: boolean;
};

// Interfaces

export interface ColorProps {
  rgb: number[];
  weight: number;
  index: number;
  hexColor: string;
  inputNumber: number;
}
