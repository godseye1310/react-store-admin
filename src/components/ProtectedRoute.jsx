import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useSelector((state) => state.authState);

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return children; // Render the child component if authenticated
};
export default ProtectedRoute;
