import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks";
import { Outlet } from "react-router-dom";

const CoursesPage = () => {
  const {t} = useTranslation();
  
  const coursesTabs = [
    { label: t("All Courses"), path: "" },
    { label: t("My Courses"), path: "my" },
    { label: t("Completed"), path: "completed" },
  ];

  return (
    <main className="courses-page">
      <SectionTabs tabs={coursesTabs} label={t("Courses")} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursesPage;
