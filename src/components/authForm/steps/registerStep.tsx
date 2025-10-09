import { useFormContext } from "react-hook-form";
import type { RegisterFormData } from "@/schemas";
import styles from "../authForm.module.scss";

type RegisterStepProps = {
  loading: boolean;
  onBack: () => void;
  onSubmit: (data: RegisterFormData) => void;
};

export const RegisterStep = ({
  loading,
  onBack,
  onSubmit,
}: RegisterStepProps) => {
  const { register, handleSubmit, formState } = useFormContext<RegisterFormData>();
  const { errors } = formState;

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Registration in BattleCode</h1>
        <p className={styles.auth__text}>Create your account to get started</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <label className={styles.auth__field}>
          <input
            type="text"
            {...register("username")}
            className={`${styles.auth__input} ${
              errors.username ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>Username</span>
          {errors.username && (
            <span className={styles.auth__error}>
              {errors.username.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <input
            type="email"
            {...register("email")}
            autoComplete="email"
            className={`${styles.auth__input} ${
              errors.email ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>Email</span>
          {errors.email && (
            <span className={styles.auth__error}>
              {errors.email.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <input
            type="password"
            {...register("password")}
            autoComplete="new-password"
            className={`${styles.auth__input} ${
              errors.password ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>Password</span>
          {errors.password && (
            <span className={styles.auth__error}>
              {errors.password.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <input
            type="password"
            {...register("confirmPassword")}
            autoComplete="new-password"
            className={`${styles.auth__input} ${
              errors.confirmPassword ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>
            Confirm the password
          </span>
          {errors.confirmPassword && (
            <span className={styles.auth__error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button
            type="submit"
            className={styles.auth__button}
            disabled={loading}
          >
            Next
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