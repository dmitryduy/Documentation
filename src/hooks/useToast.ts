import { createContext, useContext } from 'react';

interface IToastContext {
  showToast: (value: any) => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

export const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('Вызывать хук "useToast" можно только внутри провайдера "ToastProvider"');
  }

  return toastContext.showToast;
};
