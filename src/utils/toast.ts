import { toast } from "sonner";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "var(--color-green-50)",
      color: "var(--color-green-700)",
      border: "1px solid var(--color-green-200)",
    },
  });
};

export const infoToast = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: "var(--color-blue-50)",
      color: "var(--color-blue-700)",
      border: "1px solid var(--color-blue-200)",
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "var(--color-red-50)",
      color: "var(--color-red-700)",
      border: "1px solid var(--color-red-200)",
    },
  });
};
