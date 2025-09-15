import type { FC } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
	Navigate,
} from 'react-router-dom';
import CreateUrl from '../pages/createUrl';
import { ToastProvider } from '../context/toastContext';
import Redirect from '../pages/redirect';

const Wrapper: FC = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Wrapper />}>
			<Route path="/" element={<CreateUrl />} />
			<Route path="/:code" element={<Redirect />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Route>,
	),
);

const AppRouter: FC = () => (
	<ToastProvider>
		<RouterProvider router={router} />
	</ToastProvider>
)

export default AppRouter;