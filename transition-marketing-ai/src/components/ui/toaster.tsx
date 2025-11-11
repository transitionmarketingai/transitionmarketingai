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
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onOpenChange={(open) => {
            if (!open) {
              dismiss(toast.id);
            }
            toast.onOpenChange?.(open);
          }}
        >
          <div className="grid gap-1">
            {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
            {toast.description ? (
              <ToastDescription>{toast.description}</ToastDescription>
            ) : null}
          </div>
          {toast.action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
