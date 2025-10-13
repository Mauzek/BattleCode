import { AuthForm } from "@/components";
import "../../index.scss";
import { useEffect } from "react";
import { LanguageSwitcher } from "@/components/languageSwitcher/languageSwitcher";

export const AuthPage = () => {
  useEffect(() => {
    document.body.classList.add("auth-visible");
    return () => {
      document.body.classList.remove("auth-visible");
    };
  }, []);

  return (
    <main className="auth">
      {/**Убрать для отладки просто  */}
      <LanguageSwitcher />
      <AuthForm />
    </main>
  );
};