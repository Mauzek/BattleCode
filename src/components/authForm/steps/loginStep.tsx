import { useFormContext } from "react-hook-form";
import type { LoginFormData } from "@/schemas";
import styles from "../authForm.module.scss";

type LoginStepProps = {
  loading: boolean;
  onSwitchToRegister: () => void;
  onSubmit: (data: LoginFormData) => void;
};

export const LoginStep = ({
  loading,
  onSwitchToRegister,
  onSubmit,
}: LoginStepProps) => {
  const { register, handleSubmit, formState } = useFormContext<LoginFormData>();

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Welcome to BattleCode</h1>
        <p className={styles.auth__text}>
          Please enter your login and password that you received earlie
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <label className={styles.auth__field}>
          <input
            type="text"
            {...register("username")}
            autoComplete="username"
            className={`${styles.auth__input} ${
              formState.errors.username ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>Username</span>
          {formState.errors.username && (
            <span className={styles.auth__error}>
              {formState.errors.username.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <input
            type="password"
            {...register("password")}
            autoComplete="current-password"
            className={`${styles.auth__input} ${
              formState.errors.password ? styles["auth__input--error"] : ""
            }`}
            placeholder=" "
          />
          <span className={styles.auth__floatingLabel}>Пароль</span>
          {formState.errors.password && (
            <span className={styles.auth__error}>
              {formState.errors.password.message}
            </span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button
            type="submit"
            className={styles.auth__button}
            disabled={loading}
          >
            Log in
          </button>
          <button
            type="button"
            className={`${styles.auth__button} ${styles["auth__button--trasperent"]}`}
            disabled={loading}
          >
            Forgot your password?
          </button>
        </div>

        <div className={styles.auth__division} />

        <div
          className={`${styles.auth__actions} ${styles["auth__actions--bottom"]}`}
        >
          <p className={styles.auth__text}>Don't have an account?</p>
          <button
            type="button"
            className={`${styles.auth__button} ${styles["auth__button--trasperent"]}`}
            onClick={onSwitchToRegister}
          >
            Registration
          </button>
        </div>
      </form>
    </>
  );
};
