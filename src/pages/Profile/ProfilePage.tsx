import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks/localeHooks/useTranslation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { useAppSelector } from "@/hooks/storeHooks";
import { Outlet, useParams, useLocation, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  const isOwner = currentUser && username && currentUser.username === username;
  // const { user } = useAppSelector((state) => state.auth);
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
    ...(isOwner ? [
      { label: t("Edit profile"), path: `edit` },
      { label: t("Settings"), path: `settings` },
    ] : [])
  ];

  if (isOwner) {
    profileTabs.push(
      { label: t("Edit profile"), path: `edit` },
      { label: t("Settings"), path: `settings` }
    );
  }

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
