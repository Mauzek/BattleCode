import toast, { type ToastOptions } from "react-hot-toast";
import type { PromiseToastMessages } from "./types";

const TOAST_STYLE = {
  background: "#2C384A",
  color: "#fff"
};

export const promiseToast = <T,>(
  promise: () => Promise<T>,
  messages: PromiseToastMessages<T>,
  options?: ToastOptions
) => {
  return toast.promise(promise, messages, {
    style: TOAST_STYLE,
    ...options,
  });
};
