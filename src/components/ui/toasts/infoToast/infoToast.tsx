import toast, { type ToastOptions } from "react-hot-toast";
import { FcInfo  } from "react-icons/fc";

const TOAST_STYLE = {
  background: "#2C384A",
  color: "#fff",
};

export const infoToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    position: "top-right",
    icon: options?.icon ?? <FcInfo size={25} />,
    style: TOAST_STYLE,
    ...options,
  });
};