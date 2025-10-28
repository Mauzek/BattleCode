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
import { useAppDispatch } from "@/hooks/storeHooks";
import { loginUser, setUser } from "@/store/slices/authSlice";
import type { UserResponse } from "@/types/models/auth";
import { authApi } from "@/api/auth";

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
  const [tempUser, setTempUser] = useState<UserResponse | null>(null);
  const [registrationData, setRegistrationData] =
    useState<RegisterFormData | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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

  const onLoginSubmit = async (
    data: LoginFormData & { captchaResponse: string }
  ) => {
    setLoading(true);
    try {
      const userResponse = await promiseToast(
        () => dispatch(loginUser(data)).unwrap(),
        {
          loading: `${t("Logging in")}...`,
          success: () => t("Login successful"),
          error: (err) =>
            err instanceof Error ? err.message : t("Login failed"),
        }
      );

      setTempUser(userResponse);
      setStep("verify2FA");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onVerify2FASubmit = async (data: Verify2FAFormData) => {
    setLoading(true);
    try {
      await promiseToast(
        () => new Promise<string>((r) => setTimeout(() => r(""), 800)),
        {
          loading: `${t("Verifying 2FA code")}...`,
          success: () => t("2FA verified! Access granted"),
          error: () => t("Invalid code"),
        }
      );
      console.log(`2FA: ${data}`);
      if (!tempUser) throw new Error("User data missing");

      const fullUser: UserResponse = { ...tempUser };

      localStorage.setItem("accessToken", fullUser.token);
      dispatch(setUser(fullUser));

      navigate("/");
      resetLogin();
      resetVerify2FA();
    } catch (err) {
      console.error("2FA verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await promiseToast(
        () =>
          authApi.registration({
            ...data,
            avatarUrl: "",
            bio: "",
            roles: ["developer"],
          }),
        {
          loading: `${t("Registering")}...`,
          success: () => t("Check your email for a code"),
          error: (err) =>
            `${t("Error")}: ${
              err instanceof Error ? err.message : t("Registration failed")
            }`,
        }
      );

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
      const email = registrationData?.email;

      if (!email) {
        throw new Error("Email is missing");
      }

      await promiseToast(() => authApi.confirmEmail(Number(data.code), email), {
        loading: `${t("Verifying code")}...`,
        success: () => `${t("Email confirmed")}!`,
        error: (err) =>
          `${t("Verification failed")}: ${
            err instanceof Error ? err.message : t("Unknown error")
          }`,
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
      console.log("fogotPassword: " + data);
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
