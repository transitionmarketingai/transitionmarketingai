"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => {
        const { id, title, description, action, onOpenChange, ...toastProps } = toast;

        return (
          <Toast
            key={id}
            {...toastProps}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(id);
              }
              onOpenChange?.(open);
            }}
          >
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
