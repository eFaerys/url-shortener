import { createContext, useContext, useState, type FC, ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type ToastContextType = {
	showToast: (message: string, variant?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<
		{ id: number; message: string; variant: string }[]
>([]);

const showToast = (message: string, variant: string = "danger") => {
	const id = Date.now();
	setToasts((prev) => [...prev, { id, message, variant }]);
	setTimeout(() => {
	setToasts((prev) => prev.filter((t) => t.id !== id));
	}, 3000);
};

return (
	<ToastContext.Provider value={{ showToast }}>
		{children}
		<ToastContainer position="top-end" className="p-3">
			{toasts.map((toast) => (
			<Toast key={toast.id} bg={toast.variant}>
				<Toast.Body>{toast.message}</Toast.Body>
			</Toast>
			))}
		</ToastContainer>
	</ToastContext.Provider>
);
};
