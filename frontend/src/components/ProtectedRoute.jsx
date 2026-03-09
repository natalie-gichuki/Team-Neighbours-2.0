import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


// ProtectedRoute component checks if the user is authenticated and has the required role
// If not authenticated, it redirects to the login page.
// If authenticated but does not have the required role, it redirects to the home page.
// If authenticated and has the required role, it renders the children components.
// allowedRoles is an optional prop that specifies which user roles are allowed to access the route.
// If allowedRoles is not provided, any authenticated user can access the route.
// This component is typically used to protect routes that require authentication and specific user roles.
// It uses the useSelector hook to access the authentication state from the Redux store.

const ProtectedRoute = ({ children, allowedRoles }) => {
    // Access the authentication state from the Redux store
    // The user state is expected to have an isAuthenticated property and a role property.
    // If user is not authenticated, redirect to the login page.
    // If user is authenticated but does not have the required role, redirect to the home page.
    // If user is authenticated and has the required role, render the children components.
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return (
            <>
                <Navigate to="/login" />;

            </>
        );
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <>
                <Navigate to="/" />;

            </>
        );
    }

    return (
        <>
            {children}

        </>
    );
};

export default ProtectedRoute;