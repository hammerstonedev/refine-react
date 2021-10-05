export type InputComponentName =
  | "DateInput"
  | "DateInput"
  | "DateInput"
  | "DoubleDateInput"
  | "DoubleDateInput"
  | "DoubleDateInput"
  | "DoubleNumberInput"
  | "NumberInput"
  | "OptionInput"
  | "RelativeDate"
  | "RelativeDateInput"
  | "RelativeDateInput"
  | "TextInput";

export interface BaseInputProps {
  display: string;
}

export * from "./number-input";
export * from "./option-input";
export * from "./text-input";