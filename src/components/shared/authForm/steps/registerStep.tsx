import { useFormContext } from "react-hook-form";
import type { RegisterFormData } from "@/schemas";
import { Input } from "@/components/ui";
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
  const { register, handleSubmit, formState } =
    useFormContext<RegisterFormData>();
  const { errors } = formState;

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>Registration in BattleCode</h1>
        <p className={styles.auth__text}>Create your account to get started</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <label className={styles.auth__field}>
          <Input
            name="username"
            register={register}
            errors={errors}
            type="text"
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

        <label className={styles.auth__field}>
          <Input
            name="password"
            register={register}
            errors={errors}
            type="password"
            autoComplete="new-password"
            placeholder=" "
            className={`${styles.auth__input} ${
              errors.password ? styles["auth__input--error"] : ""
            }`}
          />
          <span className={styles.auth__floatingLabel}>Password</span>
          {errors.password && (
            <span className={styles.auth__error}>
              {errors.password.message}
            </span>
          )}
        </label>

        <label className={styles.auth__field}>
          <Input
            name="confirmPassword"
            register={register}
            errors={errors}
            type="password"
            autoComplete="new-password"
            placeholder=" "
            className={`${styles.auth__input} ${
              errors.confirmPassword ? styles["auth__input--error"] : ""
            }`}
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
