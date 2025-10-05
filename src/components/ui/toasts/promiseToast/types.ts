import type { Renderable } from "react-hot-toast";

export interface PromiseToastMessages<T> {
  loading: string;
  success: string | ((data: T) => Renderable);
  error: string | ((error: unknown) => Renderable);
}
