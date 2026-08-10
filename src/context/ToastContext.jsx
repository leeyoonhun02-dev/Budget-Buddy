import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import "../styles/Toast.css";

const ToastContext = createContext(null);

const DEFAULT_DURATION = 3500;

const ToastItem = ({ toast, removeToast }) => {
  return (
    <div
      className={`toast toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon" aria-hidden="true">
        {toast.type === "success" && "✓"}
        {toast.type === "error" && "!"}
        {toast.type === "warning" && "⚠"}
        {toast.type === "info" && "i"}
      </div>

      <div className="toast-content">
        {toast.title && (
          <strong className="toast-title">
            {toast.title}
          </strong>
        )}

        <p className="toast-message">
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        className="toast-close"
        onClick={() => removeToast(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>

      <span
        className="toast-progress"
        style={{
          animationDuration: `${toast.duration}ms`,
        }}
      />
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((currentToasts) =>
      currentToasts.filter(
        (toast) => toast.id !== toastId
      )
    );
  }, []);

  const showToast = useCallback(
    ({
      message,
      title = "",
      type = "success",
      duration = DEFAULT_DURATION,
    }) => {
      const toastId = `${Date.now()}-${Math.random()}`;

      const newToast = {
        id: toastId,
        message,
        title,
        type,
        duration,
      };

      setToasts((currentToasts) => [
        ...currentToasts,
        newToast,
      ]);

      window.setTimeout(() => {
        removeToast(toastId);
      }, duration);

      return toastId;
    },
    [removeToast]
  );

  const success = useCallback(
    (message, options = {}) =>
      showToast({
        ...options,
        message,
        type: "success",
      }),
    [showToast]
  );

  const error = useCallback(
    (message, options = {}) =>
      showToast({
        ...options,
        message,
        type: "error",
      }),
    [showToast]
  );

  const warning = useCallback(
    (message, options = {}) =>
      showToast({
        ...options,
        message,
        type: "warning",
      }),
    [showToast]
  );

  const info = useCallback(
    (message, options = {}) =>
      showToast({
        ...options,
        message,
        type: "info",
      }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        success,
        error,
        warning,
        info,
        removeToast,
      }}
    >
      {children}

      <div
        className="toast-container"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider."
    );
  }

  return context;
};