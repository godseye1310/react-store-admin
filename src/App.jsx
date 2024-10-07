import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import RootLayout from "./pages/Layout/RootLayout";
import AdminPanel from "./pages/Admin/AdminPanel";
import "flowbite";
import Products from "./pages/Products/Products";
import NewProduct from "./pages/Products/NewProduct";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./store/auth-Slice";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const { isLoggedIn } = useSelector((state) => state.authState);
	console.log(isLoggedIn);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	const router = createBrowserRouter([
		{
			path: "/",
			id: "root",
			element: isLoggedIn ? (
				<Navigate to="/admin" />
			) : (
				<Navigate to="/login" />
			), // Redirect from root to /admin or /login based on auth state
		},
		{
			path: "/login",
			element: !isLoggedIn ? (
				<AuthPage isSignUp={false} />
			) : (
				<Navigate to="/admin" />
			),
		},
		{
			path: "/signup",
			element: <AuthPage isSignUp={true} />,
		},
		{
			path: "/admin",
			element: (
				<ProtectedRoute>
					<RootLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true, // Default /admin page
					element: <AdminPanel />,
				},
				{ path: "users", element: <div>Users</div> },
				{
					path: "orders",
					children: [
						{ index: true, element: <div>Orders</div> },
						{ path: ":orderId", element: <div>OrderInfo</div> },
					],
				},

				{
					path: "products",
					children: [
						{ index: true, element: <Products /> },
						{
							path: ":productId",
							element: <div>ProductInfo</div>,
						},
						{ path: "new", element: <NewProduct /> },
					],
				},

				{ path: "settings", element: <div>Settings</div> },
				{ path: "profile", element: <div>Profile</div> },
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
