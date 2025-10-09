import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { promiseToast } from "../ui";
import {
  loginSchema,
  registerSchema,
  confirmCodeSchema,
  verify2FASchema,
  type LoginFormData,
  type RegisterFormData,
  type ConfirmCodeFormData,
  type Verify2FAFormData,
} from "@/schemas";
import { LoginStep } from "./steps/loginStep";
import { RegisterStep } from "./steps/registerStep";
import { ConfirmEmailStep } from "./steps/confirmEmailStep";
import { TwoFAStep } from "./steps/twoFAStep";
import { Verify2FAStep } from "./steps/verify2FAStep";
import styles from "./authForm.module.scss";
import { useNavigate } from "react-router-dom";

type AuthStep = "login" | "register" | "confirmEmail" | "twoFA" | "verify2FA";

export const AuthForm = () => {
  const [step, setStep] = useState<AuthStep>("login");
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] =
    useState<RegisterFormData | null>(null);
  const navigate = useNavigate();
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

  const { reset: resetLogin } = loginForm;
  const { reset: resetRegister } = registerForm;
  const { reset: resetConfirm } = confirmCodeForm;
  const { reset: resetVerify2FA } = verify2FAForm;

  const resetAllForms = () => {
    resetLogin();
    resetRegister();
    resetConfirm();
    resetVerify2FA();
    setRegistrationData(null);
  };

  const sendData = async (data: unknown): Promise<string> => {
    console.log("Отправка данных:", data);
    return new Promise((resolve) => setTimeout(() => resolve("OK"), 1000));
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await promiseToast(() => sendData(data), {
        loading: "Logging in...",
        success: () => "Login successful",
        error: () => "Incorrect username or password",
      });

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
  };

  const onVerify2FASubmit = async (data: Verify2FAFormData) => {
    setLoading(true);
    try {
      const token = await promiseToast(
        () =>
          new Promise<string>((r) =>
            setTimeout(() => r("mock-jwt-token"), 800)
          ),
        {
          loading: "Verifying 2FA code...",
          success: () => "2FA verified! Access granted.",
          error: (err) => `Invalid code: ${err}`,
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
        loading: "Registering...",
        success: () => "Registration initiated. Check your email for a code.",
        error: (err) => `Error: ${err}`,
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
        loading: "Verifying code...",
        success: () => "Email confirmed!",
        error: (err) => `Verification failed: ${err}`,
      });
      setStep("twoFA");
    } catch (err) {
      console.error("Confirm code error:", err);
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

      default:
        return null;
    }
  };

  return <section className={styles.auth}>{renderStep()}</section>;
};
