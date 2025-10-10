import { SectionTabs } from "@/components";
import { Outlet, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  const profileTabs = [
    { label: "About a participant", path: `` },
    { label: "Badges", path: `badges` },
    { label: "Edit profile", path: `edit` },
    { label: "Settings", path: `settings` },
  ];

  return (
    <main style={{ height: "1000px" }}>
      <SectionTabs tabs={profileTabs} label={username} />
      <Outlet />
    </main>
  );
};

export default ProfilePage;