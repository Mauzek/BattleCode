import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { username } = useParams();
  return (
    <main>
      <h1>Профиль {username}</h1>
    </main>
  );
};
