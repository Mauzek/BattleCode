import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { fetchCourse, clearCurrentCourse } from '@/store/slices/courseSlice';
import { SectionTabs } from '@/components';
import { useTranslation } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(app => app.course);
  const { t } = useTranslation();

  useEffect(() => {
    if (!courseId) return;

    const id = Number(courseId);
    if (!isNaN(id)) {
      dispatch(fetchCourse(id));
    }

    // Очистка при размонтировании (или при смене курса)
    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, courseId]);

  const courseTabs = [
    { label: t("Overview"), path: "" },
    { label: t("Assignments"), path: "tasks" },
    { label: t("Edit"), path: "edit" },
  ];

  return (
    <main className="course-page">
      <SectionTabs 
        tabs={courseTabs} 
        label={currentCourse ? currentCourse.title : `${t("Course")} ${courseId}`} 
      />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursePage;