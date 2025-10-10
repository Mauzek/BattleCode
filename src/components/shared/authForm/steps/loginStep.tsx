import { useFormContext } from "react-hook-form";
import type { LoginFormData } from "@/schemas";
import { Input } from "@/components/ui";
import styles from "../authForm.module.scss";

type LoginStepProps = {
  loading: boolean;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  onSubmit: (data: LoginFormData) => void;
};

export const LoginStep = ({
  loading,
  onSwitchToRegister,
  onForgotPassword,
  onSubmit,
}: LoginStepProps) => {
  const { register, handleSubmit, formState } = useFormContext<LoginFormData>();
  const { errors } = formState;

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
          <Input
            name="username"
            register={register}
            errors={errors}
            type="text"
            autoComplete="username"
            placeholder=" "
            className={`${styles.auth__input} ${
              errors.username ? styles["auth__input--error"] : ""
            }`}
          />
          <span className={styles.auth__floatingLabel}>Username</span>
          {errors.username && (
            <span className={styles.auth__error}>
              {errors.username.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <Input
            name="password"
            register={register}
            errors={errors}
            type="password"
            autoComplete="current-password"
            placeholder=" "
            className={`${styles.auth__input} ${
              errors.password ? styles["auth__input--error"] : ""
            }`}
          />
          <span className={styles.auth__floatingLabel}>Пароль</span>
          {errors.password && (
            <span className={styles.auth__error}>
              {errors.password.message}
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
            onClick={onForgotPassword}
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
