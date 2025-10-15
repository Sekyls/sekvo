import { toast } from "sonner";

const toastOptions = {
  success: {
    classNames: {
      success: "bg-green-800! text-white! shadow-lg!",
      title: "font-semibold! text-base!",
      description: "text-white! font-semibold!",
      actionButton:
        "bg-white! text-green-800! px-2! py-1! font-bold! rounded! hover:scale-110! transition-transform! duration-150!",
    },
  },
  error: {
    classNames: {
      error: "bg-imperial-red! text-white! shadow-lg!",
      title: "font-semibold! text-base!",
      description: "text-white! font-semibold!",
      actionButton:
        "bg-white! text-imperial-red! font-bold!  px-2! py-1! rounded! hover:scale-110! transition-transform! duration-150!",
    },
  },
  loading: {
    classNames: {
      loading: "bg-accent! text-white! shadow-lg!",
      title: "font-semibold! text-base!",
      description: "text-white! font-semibold!",
      actionButton:
        "bg-white! text-accent! font-bold!  px-2! py-1! rounded! hover:scale-110! transition-transform! duration-150!",
    },
  },
};

export const toastSuccess = (
  title: string,
  description?: string,
  action?: { label: string; onClick: () => void }
) => {
  toast.success(title, {
    description,
    action,
    duration: 5000,
    ...toastOptions.success,
  });
};

export const toastError = (
  title: string,
  description?: string,
  action?: { label: string; onClick: () => void }
) => {
  toast.error(title, {
    description,
    action,
    duration: 5000,
    ...toastOptions.error,
  });
};

export const toastLoading = (title: string, description?: string) => {
  toast.loading(title, {
    description,
    duration: 5000,
    ...toastOptions.loading,
  });
};
