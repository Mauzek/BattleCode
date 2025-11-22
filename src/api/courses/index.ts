import { apiClient } from "@/api"; // предполагаемый клиент (инстанс axios)
import type {
  Complaint,
  ComplaintRequest,
  Course,
  CreateCourseRequest,
  CreateTaskRequest,
  Pageable,
  PageResponse,
  PeerReview,
  PeerReviewRequest,
  SubmitCodeRequest,
  Subscription,
  Task,
  TaskSubmission,
  UpdateCourseRequest,
  UpdateTaskRequest,
} from "@/types";
import axios from "axios";

// ==== ТИПЫ (можно вынести в ./types.ts) ====
// Важно: имена типов могут отличаться — подстрой под свою модель

// ==== API ====

export const coursesApi = {
  // === COURSES ===
  async getCourse(id: number): Promise<Course> {
    try {
      const response = await apiClient.get<Course>(`/course/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getAllCourses(pageable: Pageable): Promise<PageResponse<Course>> {
    try {
      const params = {
        page: pageable.page,
        size: pageable.size,
        sort: pageable.sort?.join(","),
      };
      const response = await apiClient.get<PageResponse<Course>>(
        "/course/all",
        { params }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch courses";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async createCourse(data: CreateCourseRequest): Promise<Course> {
    try {
      const response = await apiClient.post<Course>("/api/course", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to create course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async updateCourse(id: number, data: UpdateCourseRequest): Promise<Course> {
    try {
      const response = await apiClient.put<Course>(`/api/course/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to update course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async deleteCourse(id: number): Promise<void> {
    try {
      await apiClient.delete(`/api/course/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to delete course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async addTasksToCourse(courseId: number, taskIds: number[]): Promise<void> {
    try {
      await apiClient.post(`/api/course/${courseId}/add-tasks`, { taskIds });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to add tasks to course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  // === TASKS ===
  async getTasksByCourse(courseId: number): Promise<Task[]> {
    try {
      const response = await apiClient.get<Task[]>(`/api/task/set`, {
        params: { course_id: courseId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch tasks for course";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getTasksPageByCourse(
    courseId: number,
    pageable: Pageable
  ): Promise<PageResponse<Task>> {
    try {
      const params = {
        course_id: courseId,
        page: pageable.page,
        size: pageable.size,
        sort: pageable.sort?.join(","),
      };
      const response = await apiClient.get<PageResponse<Task>>(
        "/api/task/page",
        { params }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch paginated tasks";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getNextTask(courseId: number, currentTaskId: number): Promise<Task> {
    try {
      const response = await apiClient.get<Task>("/api/task/next", {
        params: { course_id: courseId, current_task_id: currentTaskId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "No next task found";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async createTask(data: CreateTaskRequest): Promise<Task> {
    try {
      const response = await apiClient.post<Task>("/api/task", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to create task";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
    try {
      const response = await apiClient.put<Task>(`/api/task/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to update task";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await apiClient.delete(`/api/task/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to delete task";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  // === SUBSCRIPTIONS (курсовая подпписка) ===
  async subscribeToCourse(courseId: number): Promise<Subscription> {
    try {
      const response = await apiClient.post<Subscription>(
        "/api/subscriptions/subscribe",
        null,
        {
          params: { course_id: courseId },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Failed to subscribe";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async cancelSubscription(courseId: number): Promise<void> {
    try {
      await apiClient.post("/api/subscriptions/cancel", null, {
        params: { course_id: courseId },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to cancel subscription";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async updateProgress(courseId: number, progress: number): Promise<void> {
    try {
      await apiClient.put("/api/subscriptions/progress", null, {
        params: { course_id: courseId, progress },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to update progress";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  // === SUBMISSIONS & PEER REVIEWS ===
  async submitCode(data: SubmitCodeRequest): Promise<TaskSubmission> {
    try {
      const response = await apiClient.post<TaskSubmission>(
        "/api/submissions",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to submit code";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async saveDraft(data: SubmitCodeRequest): Promise<TaskSubmission> {
    try {
      const response = await apiClient.post<TaskSubmission>(
        "/api/submissions/submissions/draft",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Failed to save draft";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async publishSubmission(submissionId: number): Promise<TaskSubmission> {
    try {
      const response = await apiClient.post<TaskSubmission>(
        `/api/submissions/${submissionId}/publish`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to publish submission";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getAvailableSubmissionsForReview(
    taskId: number
  ): Promise<TaskSubmission[]> {
    try {
      const response = await apiClient.get<TaskSubmission[]>(
        `/api/submissions/tasks/${taskId}/available`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          "Failed to fetch available submissions";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async canReviewSubmission(
    submissionId: number
  ): Promise<{ canReview: boolean }> {
    try {
      const response = await apiClient.get<{ canReview: boolean }>(
        `/api/peer-reviews/submissions/${submissionId}/can-review`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to check review eligibility";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async submitReview(
    submissionId: number,
    review: PeerReviewRequest
  ): Promise<PeerReview> {
    try {
      const response = await apiClient.post<PeerReview>(
        `/api/peer-reviews/submissions/${submissionId}/reviews`,
        review
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to submit review";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getMyReviews(): Promise<PeerReview[]> {
    try {
      const response = await apiClient.get<PeerReview[]>(
        "/api/peer-reviews/reviews/my"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch your reviews";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async submitComplaint(
    reviewId: number,
    complaint: ComplaintRequest
  ): Promise<Complaint> {
    try {
      const response = await apiClient.post<Complaint>(
        `/api/peer-reviews/reviews/${reviewId}/complaints`,
        complaint
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to submit complaint";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async getMyComplaints(): Promise<Complaint[]> {
    try {
      const response = await apiClient.get<Complaint[]>(
        "/api/peer-reviews/complaints/my"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || "Failed to fetch complaints";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },
};
