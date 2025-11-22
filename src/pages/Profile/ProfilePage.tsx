import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks/localeHooks/useTranslation";
import { useAppSelector } from "@/hooks/storeHooks";
import { Outlet, useParams, useLocation, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const isOwner = user && username && user.username === username;
  const location = useLocation();

  const restrictedRoutes = ["/edit", "/settings"];

  const isRestricted = restrictedRoutes.some((route) =>
    location.pathname.endsWith(route)
  );

  if (!isOwner && isRestricted) {
    return <Navigate to={`/user/${username}`} replace />;
  }

  const profileTabs = [
    { label: t("About a participant"), path: `` },
    { label: t("Badges"), path: `badges` },
    ...(isOwner
      ? [
          { label: t("Edit profile"), path: `edit` },
          { label: t("Settings"), path: `settings` },
        ]
      : []),
  ];

  return (
    <main>
      <SectionTabs tabs={profileTabs} label={username} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default ProfilePage;
