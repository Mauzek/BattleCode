import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { username } = useParams();
  return (
    <main style={{ height: "1000px" }}>
      <h1>Профиль {username}</h1>
    </main>
  );
};
