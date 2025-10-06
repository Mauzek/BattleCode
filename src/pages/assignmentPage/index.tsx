import { useParams } from "react-router-dom";

export const AssignmentPage = () => {
    const { courseId, assignmentId } = useParams();
  return (
    <main>
        <h1>Задание {assignmentId} из курса {courseId}</h1>
    </main>
  )
}
