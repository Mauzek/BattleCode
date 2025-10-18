export interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  status: "not started" | "in progress" | "completed";
  progress: number;
  tags: string[];
  slug?: string;
}
