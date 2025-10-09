import { useFormContext } from "react-hook-form";
import type { ConfirmCodeFormData } from "@/schemas";
import styles from "../authForm.module.scss";

type ConfirmEmailStepProps = {
  loading: boolean;
  email: string;
  onBack: () => void;
  onSubmit: (data: ConfirmCodeFormData) => void;
};

export const ConfirmEmailStep = ({
  loading,
  email,
  onBack,
  onSubmit,
}: ConfirmEmailStepProps) => {
  const { register, handleSubmit, formState } =
    useFormContext<ConfirmCodeFormData>();
  const { errors } = formState;

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Confirm Your Email</h1>
        <p className={styles.auth__text}>
          We sent a 6-digit code to <strong>{email}</strong>
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
          <span className={styles.auth__floatingLabel}>Код подтверждения</span>
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
