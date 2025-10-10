import { ModalWrapper } from "@/components";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main style={{height: "2000px"}}>
      <h1>Главная</h1>
      <button onClick={() => setIsMenuOpen(true)}>Открыть меню</button>
      <ModalWrapper
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Test"
        variant="center"
      >
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/courses">Курсы</Link>
          <Link to="/user/boby">Профиль</Link>
          <Link to="/calendar">Календарь</Link>
        </nav>
      </ModalWrapper>
    </main>
  );
};
