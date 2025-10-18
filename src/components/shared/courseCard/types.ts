export interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  status: "not started" | "in progress" | "completed" | string;
  progress: number;
  tags: string[];
  slug?: string;
}
