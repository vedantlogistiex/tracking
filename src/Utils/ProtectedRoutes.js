import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

const ProtectedRoute = ({ element }) => {
    const user = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
