import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { promiseToast } from "@/components";
import {
  loginSchema,
  registerSchema,
  confirmCodeSchema,
  verify2FASchema,
  forgotPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ConfirmCodeFormData,
  type Verify2FAFormData,
  type ForgotPasswordFormData,
} from "@/schemas";
import { LoginStep } from "./steps/loginStep";
import { RegisterStep } from "./steps/registerStep";
import { ConfirmEmailStep } from "./steps/confirmEmailStep";
import { TwoFAStep } from "./steps/twoFAStep";
import { Verify2FAStep } from "./steps/verify2FAStep";
import { ForgotPasswordStep } from "./steps/forgotPasswordStep";
import styles from "./authForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks";

type AuthStep =
  | "login"
  | "register"
  | "confirmEmail"
  | "twoFA"
  | "verify2FA"
  | "forgotPassword";

export const AuthForm = () => {
  const [step, setStep] = useState<AuthStep>("login");
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] =
    useState<RegisterFormData | null>(null);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const confirmCodeForm = useForm<ConfirmCodeFormData>({
    resolver: zodResolver(confirmCodeSchema),
    mode: "onBlur",
  });

  const verify2FAForm = useForm<Verify2FAFormData>({
    resolver: zodResolver(verify2FASchema),
    mode: "onBlur",
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const { reset: resetLogin } = loginForm;
  const { reset: resetRegister } = registerForm;
  const { reset: resetConfirm } = confirmCodeForm;
  const { reset: resetVerify2FA } = verify2FAForm;
  const { reset: resetForgotPassword } = forgotPasswordForm;

  const resetAllForms = () => {
    resetLogin();
    resetRegister();
    resetConfirm();
    resetVerify2FA();
    resetForgotPassword();
    setRegistrationData(null);
  };

  const sendData = async (data: unknown): Promise<string> => {
    console.log("Отправка данных:", data);
    return new Promise((resolve) => setTimeout(() => resolve("OK"), 1000));
  };

const onLoginSubmit = async (data: LoginFormData & { captchaResponse: string }) => {
  setLoading(true);
  try {
    await promiseToast(
      () =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            const shouldSucceed = true; 
            if (shouldSucceed) {
              resolve();
            } else {
              reject(new Error(t(("Incorrect username or password"))));
            }
          }, 1000);
        }),
      {
        loading: `${t("Logging in")}...`,
        success: () => t("Login successful"),
        error: (err) => (err instanceof Error ? err.message : t("Login failed")),
      }
    );
    console.log('Login: '+ data.username)
    console.log('password: '+ data.password)
    console.log('captchaResponse: '+ data.captchaResponse)
    const userHas2FA = true; 

    if (userHas2FA) {
      setStep("verify2FA");
    } else {
      resetLogin();
      console.log("Welcome! No 2FA required.");
    }
  } catch (err) {
    console.error("Login error:", err);
  } finally {
    setLoading(false);
  }
}

  const onVerify2FASubmit = async (data: Verify2FAFormData) => {
    setLoading(true);
    try {
      const token = await promiseToast(
        () =>
          new Promise<string>((r) =>
            setTimeout(() => r("mock-jwt-token"), 800)
          ),
        {
          loading: `${t("Verifying 2FA code")}...`,
          success: () => t("2FA verified! Access granted"),
          error: () => t("Invalid code"),
        }
      );
      console.log(`2FA: ${data}`);
      localStorage.setItem("token", token);
      navigate("/");
      resetLogin();
      resetVerify2FA();
      console.log("User authenticated and token saved!");
    } catch (err) {
      console.error("2FA verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await promiseToast(() => sendData(data), {
        loading: `${t("Registering")}...`,
        success: () => t("Check your email for a code"),
        error: (err) => `${t("Error")}: ${err}`,
      });
      setRegistrationData(data);
      setStep("confirmEmail");
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onConfirmSubmit = async (data: ConfirmCodeFormData) => {
    setLoading(true);
    try {
      console.log(`confirm: ${data.code}`);
      await promiseToast(() => new Promise((r) => setTimeout(r, 800)), {
        loading: `${t("Verifying code")}...`,
        success: () => `${t("Email confirmed")}!`,
        error: (err) => `${t("Verification failed")}: ${err}`,
      });
      setStep("twoFA");
    } catch (err) {
      console.error("Confirm code error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await promiseToast(
        () => new Promise((resolve) => setTimeout(resolve, 600)),
        {
          loading: `${t("Sending recovery email")}...`,
          success: () => t("Recovery link sent"),
          error: () => t("Failed to send recovery email"),
        }
      );
      console.log("fogotPassword: " + data)
      setStep("login");
      resetForgotPassword();
    } catch (err) {
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateOtpAuthUrl = (username: string): string => {
    const secret = "JBSWY3DPEHPK3PXP";
    return `otpauth://totp/BattleCode:${encodeURIComponent(
      username
    )}?secret=${secret}&issuer=BattleCode`;
  };

  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <FormProvider {...loginForm}>
            <div className={styles.auth__card} key="login">
              <LoginStep
                loading={loading}
                onSwitchToRegister={() => setStep("register")}
                onForgotPassword={() => setStep("forgotPassword")}
                onSubmit={onLoginSubmit}
              />
            </div>
          </FormProvider>
        );

      case "register":
        return (
          <FormProvider {...registerForm}>
            <div className={styles.auth__card} key="register">
              <RegisterStep
                loading={loading}
                onBack={() => setStep("login")}
                onSubmit={onRegisterSubmit}
              />
            </div>
          </FormProvider>
        );

      case "confirmEmail":
        return (
          <FormProvider {...confirmCodeForm}>
            <div className={styles.auth__card} key="confirmEmail">
              <ConfirmEmailStep
                loading={loading}
                email={registrationData?.email || ""}
                onBack={() => setStep("register")}
                onSubmit={onConfirmSubmit}
              />
            </div>
          </FormProvider>
        );

      case "twoFA":
        return (
          <div className={styles.auth__card} key="twoFA">
            <TwoFAStep
              qrCodeUrl={generateOtpAuthUrl(registrationData?.username || "")}
              onDone={() => {
                resetAllForms();
                setStep("login");
              }}
            />
          </div>
        );

      case "verify2FA":
        return (
          <FormProvider {...verify2FAForm}>
            <div className={styles.auth__card} key="verify2FA">
              <Verify2FAStep
                loading={loading}
                onBack={() => {
                  setStep("login");
                  resetVerify2FA();
                }}
                onSubmit={onVerify2FASubmit}
              />
            </div>
          </FormProvider>
        );

      case "forgotPassword":
        return (
          <FormProvider {...forgotPasswordForm}>
            <div className={styles.auth__card} key="forgotPassword">
              <ForgotPasswordStep
                loading={loading}
                onBack={() => setStep("login")}
                onSubmit={onForgotPasswordSubmit}
              />
            </div>
          </FormProvider>
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.auth}>
      {renderStep()}
      <img className={styles.auth__logo} src="/logo.svg" alt="BattleCode" />
    </section>
  );
};
