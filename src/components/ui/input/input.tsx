// src/components/ui/Input.tsx
import type {
  UseFormRegister,
  FieldErrors,
  FieldPath,
} from "react-hook-form";
import styles from "./input.module.scss";

type InputProps<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel" | "url" | "search" | "none";
  maxLength?: number;
  autoCorrect?: "on" | "off";
  autoCapitalize?: "on" | "off" | "none" | "sentences" | "words" | "characters";
  spellCheck?: boolean;
  className?: string;
};

export const Input = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
  type = "text",
  placeholder = " ",
  autoComplete,
  inputMode,
  maxLength,
  autoCorrect = "off",
  autoCapitalize = "off",
  spellCheck = false,
  className,
}: InputProps<T>) => {
  const error = errors[name];

  return (
    <input
      type={type}
      {...register(name)}
      className={`${styles.input} ${className} ${
        error ? styles["field__input--error"] : ""
      }`}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      spellCheck={spellCheck}
    />
  );
};