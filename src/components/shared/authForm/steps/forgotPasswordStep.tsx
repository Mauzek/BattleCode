import { useFormContext } from "react-hook-form";
import type { ForgotPasswordFormData } from "@/schemas";
import { Input } from "@/components/ui";
import styles from "../authForm.module.scss";

type ForgotPasswordStepProps = {
  loading: boolean;
  onBack: () => void;
  onSubmit: (data: ForgotPasswordFormData) => void;
};

export const ForgotPasswordStep = ({
  loading,
  onBack,
  onSubmit,
}: ForgotPasswordStepProps) => {
  const { register, handleSubmit, formState } =
    useFormContext<ForgotPasswordFormData>();
  const { errors } = formState;

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Forgot Password?</h1>
        <p className={styles.auth__text}>
          Enter your email and we’ll send you a link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <label className={styles.auth__field}>
          <Input
            name="email"
            register={register}
            errors={errors}
            type="email"
            autoComplete="email"
            placeholder=" "
            className={`${styles.auth__input} ${
              errors.email ? styles["auth__input--error"] : ""
            }`}
          />
          <span className={styles.auth__floatingLabel}>Email</span>
          {errors.email && (
            <span className={styles.auth__error}>{errors.email.message}</span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button
            type="submit"
            className={styles.auth__button}
            disabled={loading}
          >
            Send Reset Link
          </button>
          <button
            type="button"
            className={`${styles.auth__button} ${styles["auth__button--trasperent"]}`}
            onClick={onBack}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
};
