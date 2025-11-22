export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  price: number;
  isPublished: boolean;
  authorId: string;
  tasks: TaskPreview[];
  studentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  testCases: string;
  difficulty: string;
  type: string;
  orderIndex: number;
  estimatedMinutes: number;
  content: string;
  courses?: CoursePreview[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskPreview {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  orderIndex: number;
  // ... остальные поля по необходимости
}

export interface CoursePreview {
  id: number;
  title: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  price: number;
  taskIds?: number[];
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  imageUrl?: string;
  level?: string;
  price?: number;
  isPublished?: boolean;
  taskIdsToAdd?: number[];
  taskIdsToRemove?: number[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  initialCode: string;
  testCases: string;
  difficulty: string;
  type: string;
  orderIndex: number;
  estimatedMinutes: number;
  content: string;
  courseIds?: number[];
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  id?: number;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Subscription {
  subscriptionId: number;
  userId: string;
  courseInfo: number;
  subscribedAt: string;
  completedAt: string | null;
  progress: number;
  isActive: boolean;
}

export interface TaskSubmission {
  taskSubmissionId: number;
  taskId: number;
  userId: string;
  code: string;
  status: string;
  submittedAt: string;
  publishedAt: string | null;
  completedReviewsCount: number;
  requiredReviewsCount: number;
  avgReadability: number;
  avgEfficiency: number;
  avgScalability: number;
  avgReliability: number;
  avgMaintainability: number;
  overallScore: number;
  // reviews — можно опустить для лёгкости
}

export interface SubmitCodeRequest {
  taskId: number;
  code: string;
}

export interface PeerReviewRequest {
  readability: number;
  efficiency: number;
  scalability: number;
  reliability: number;
  maintainability: number;
  comment: string;
}

export interface PeerReview {
  peerReviewId: number;
  submissionId: number;
  reviewerId: string;
  readability: number;
  efficiency: number;
  scalability: number;
  reliability: number;
  maintainability: number;
  comment: string;
  status: string;
  reviewedAt: string;
}

export interface ComplaintRequest {
  reason: string;
  description: string;
}

export interface Complaint {
  reviewComplainId: number;
  reviewId: number;
  complainantId: string;
  reason: string;
  description: string;
  status: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNote?: string;
}
