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

const router = createBrowserRouter([
	{
		path: "/",
		id: "root",
		element: <Navigate to="/admin" />, // Redirect from root to /admin
	},
	{
		path: "/login",
		element: <AuthPage />,
	},
	{
		path: "/signup",
		element: <AuthPage />,
	},
	{
		path: "/admin",
		element: <RootLayout />,
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
					{ path: "new", element: <div>NewProduct</div> },
				],
			},

			{ path: "settings", element: <div>Settings</div> },
			{ path: "profile", element: <div>Profile</div> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
