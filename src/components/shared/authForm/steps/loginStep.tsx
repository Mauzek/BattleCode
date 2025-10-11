import { useFormContext } from "react-hook-form";
import type { LoginFormData } from "@/schemas";
import { Input } from "@/components/ui";
import styles from "../authForm.module.scss";
import { env } from "@/config/env";

type LoginStepProps = {
  loading: boolean;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  onSubmit: (data: LoginFormData & { captchaResponse: string }) => void;
};

export const LoginStep = ({
  loading,
  onSwitchToRegister,
  onForgotPassword,
  onSubmit,
}: LoginStepProps) => {
  const { register, handleSubmit, formState } = useFormContext<LoginFormData>();
  const { errors } = formState;

  const handleLogin = async (data: LoginFormData) => {
    if (!window.grecaptcha?.enterprise) {
      alert("CAPTCHA не загружена");
      return;
    }

    const token = await window.grecaptcha.enterprise.execute(env.siteKey, {
      action: "login",
    });

    onSubmit({ ...data, captchaResponse: token });
  };

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Welcome to BattleCode</h1>
        <p className={styles.auth__text}>
          Please enter your login and password
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className={styles.auth__form}>
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
            <span className={styles.auth__error}>{errors.username.message}</span>
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
          <span className={styles.auth__floatingLabel}>Password</span>
          {errors.password && (
            <span className={styles.auth__error}>{errors.password.message}</span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button type="submit" className={styles.auth__button} disabled={loading}>
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

        <div className={`${styles.auth__actions} ${styles["auth__actions--bottom"]}`}>
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
