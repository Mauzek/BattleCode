import toast from "react-hot-toast";
import styles from "./header.module.scss";
import { infoToast, promiseToast } from "@/components/ui";
import { FcCommandLine } from "react-icons/fc";

export const Header = () => {
  const { success, error } = toast;

  const sendData = async (): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve("ok"), 3000));
  };

  const handleClick = () => {
    infoToast("Уведомляю шо ты чмо!");
    infoToast("Новые задания по С++ уже доступны!", {
      icon: <FcCommandLine size={25} />,
    });
    success("Успех!");
    error("Ошибка!");
    promiseToast(sendData, {
      loading: "Загрузка...",
      success: (data) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {data}
        </div>
      ),
      error: (err) => `${err}`,
    });
  };

  return (
    <header className={styles.header}>
      <button onClick={handleClick}>Пример</button>
    </header>
  );
};
