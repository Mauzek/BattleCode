import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks";
import { Outlet, useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const {t} = useTranslation();
  const courseTabs = [
    { label: t("Overview"), path: `` },
    { label: t("Assignments"), path: `tasks` },
    { label: t("Edit"), path: `edit` },
  ];

  return (
    <main className="course-page">
      <SectionTabs tabs={courseTabs} label={`${t("Course")} ${courseId}`} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursePage;
