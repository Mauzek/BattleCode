import { useFormContext } from "react-hook-form";
import type { RegisterFormData } from "@/schemas";
import { Input } from "@/components/ui";
import styles from "../authForm.module.scss";
import { useTranslation } from "@/hooks";

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
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>
          {t("Registration in BattleCode")}
        </h1>
        <p className={styles.auth__text}>
          {t("Create your account to get started")}
        </p>
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
          <span className={styles.auth__floatingLabel}>{t("Username")}</span>
          {errors.username && (
            <span className={styles.auth__error}>
              {t(errors.username.message ?? "")}
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
            <span className={styles.auth__error}>
              {t(errors.email.message ?? "")}
            </span>
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
          <span className={styles.auth__floatingLabel}>{t("Password")}</span>
          {errors.password && (
            <span className={styles.auth__error}>
              {t(errors.password.message ?? "")}
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
            {t("Confirm the password")}
          </span>
          {errors.confirmPassword && (
            <span className={styles.auth__error}>
              {t(errors.confirmPassword.message ?? "")}
            </span>
          )}
        </label>

        <div className={styles.auth__actions}>
          <button
            type="submit"
            className={styles.auth__button}
            disabled={loading}
          >
            {t("Next")}
          </button>
          <button
            type="button"
            className={`${styles.auth__button} ${styles["auth__button--trasperent"]}`}
            onClick={onBack}
          >
            {t("Back")}
          </button>
        </div>
      </form>
    </>
  );
};
