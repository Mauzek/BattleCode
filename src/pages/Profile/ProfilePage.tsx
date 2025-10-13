import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks/localeHooks/useTranslation";
import { Outlet, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const {t } = useTranslation();
  const profileTabs = [
    { label: t("About a participant"), path: `` },
    { label: t("Badges"), path: `badges` },
    { label: t("Edit profile"), path: `edit` },
    { label: t("Settings"), path: `settings` },
  ];

  return (
    <main style={{ height: "1000px" }}>
      <SectionTabs tabs={profileTabs} label={username} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default ProfilePage;