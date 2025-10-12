import { AuthForm } from "@/components";
import "../../index.scss";
import { useEffect } from "react";

export const AuthPage = () => {
  
  useEffect(() => {
    document.body.classList.add("auth-visible");
    return () => {
      document.body.classList.remove("auth-visible");
    };
  }, []);

  return (
    <main className="auth">
      <AuthForm />
    </main>
  );
};
