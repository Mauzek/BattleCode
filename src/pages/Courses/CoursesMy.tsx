import { CoursesDetails, CoursesDetailsSkeleton } from "@/components";
import { useEffect, useState } from "react";
import { myCourses } from "./CoursesIndex";


const CoursesMy = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadMyCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <CoursesDetailsSkeleton />
      ) : (
        <CoursesDetails courses={myCourses} />
      )}
    </>
  );
};

export default CoursesMy;
