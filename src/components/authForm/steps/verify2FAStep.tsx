import { useFormContext } from "react-hook-form";
import type { Verify2FAFormData } from "@/schemas";
import styles from "../authForm.module.scss";

type Verify2FAStepProps = {
  loading: boolean;
  onBack: () => void;
  onSubmit: (data: Verify2FAFormData) => void;
};

export const Verify2FAStep = ({
  loading,
  onBack,
  onSubmit,
}: Verify2FAStepProps) => {
  const { register, handleSubmit, formState } =
    useFormContext<Verify2FAFormData>();
  const { errors } = formState;

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Two-Factor Authentication</h1>
        <p className={styles.auth__text}>
          Enter the 6-digit code from your authenticator app
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.auth__form}
        autoComplete="off"
      >
        <label className={styles.auth__field}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...register("code")}
            className={`${styles.auth__input} ${
              errors.code ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>
            Authentication code
          </span>
          {errors.code && (
            <span className={styles.auth__error}>{errors.code.message}</span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button
            type="submit"
            className={styles.auth__button}
            disabled={loading}
          >
            Verify
          </button>
          <button
            type="button"
            className={`${styles.auth__button} ${styles["auth__button--trasperent"]}`}
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
};
