import { toast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'destructive' | 'success';
}

export function useToast() {
  const showToast = ({
    title,
    description,
    duration = 5000,
    action,
  }: ToastOptions) => {
    toast(title, {
      description,
      duration,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
    });
  };

  return {
    toast: showToast,
    success: (options: ToastOptions) => {
      showToast({
        ...options,
        title: options.title || 'Success',
      });
    },
    error: (options: ToastOptions) => {
      showToast({
        ...options,
        title: options.title || 'Error',
        duration: options.duration || 7000,
      });
    },
    loading: (options: ToastOptions) => {
      return toast.loading(options.title || 'Loading...', {
        description: options.description,
      });
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },
  };
}