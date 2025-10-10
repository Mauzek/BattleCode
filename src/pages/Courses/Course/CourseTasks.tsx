import { Link } from "react-router-dom";

const CourseTasks = () => {
  return (
    <div>
      <h2>Course tasks</h2>
      <Link to="/courses/123/tasks/123">Task 123</Link>
    </div>
  );
};

export default CourseTasks;
