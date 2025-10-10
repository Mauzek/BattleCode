import { Link } from "react-router-dom";

const CoursesIndex = () => {
  return (
    <div>
      <h2>Courses</h2>
      <Link to="/courses/123">Course 123</Link>
    </div>
  );
};

export default CoursesIndex;