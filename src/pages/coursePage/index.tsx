import { useParams } from "react-router-dom";

export const CoursePage = () => {
    const { courseId } = useParams();
  return (
    <main>
        <h1>Конкретный курс {courseId}</h1>
    </main>
  )
}
