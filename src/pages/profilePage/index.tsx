import { SectionTabs } from "@/components";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { username } = useParams();

  const profileTabs = [
    { label: "About a participant", path: `/user/${username}` },
    { label: "Badges", path: `/user/badges` },
    { label: "Edit profile", path: "/user/edit" },
    { label: "Settings", path: "/user/settings" },
  ];

  return (
    <main style={{ height: "1000px" }}>
      <SectionTabs tabs={profileTabs} label={username} />
      <h1>Профиль {username}</h1>
    </main>
  );
};
