import { useLocation } from "react-router-dom";

export const CoursesPage: React.FC = () => {
  const location = useLocation();

  const isMyCourses = location.pathname === "/courses/my";

  return (
    <main>
      <h1>{isMyCourses ? "Мои курсы" : "Все курсы"}</h1>
      {isMyCourses ? (
        <p>Здесь отображаются только ваши курсы</p>
      ) : (
        <p>Список всех доступных курсов</p>
      )}
    </main>
  );
};
