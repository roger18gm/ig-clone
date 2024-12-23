import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { authUser } = useAuth()

    if (!authUser) {
        // authUser is not authenticated
        return <Navigate to="/auth" />;
    }
    return <>{children}</>
};

export default ProtectedRoute;



// Chat GPT protectedroute

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {
//     const { session, loading } = useAuth();
//     console.log("ProtectedRoute Session:", session); // Ensure this logs the session
//     console.log("ProtectedRoute Loading:", loading); // Ensure this logs the session

//     if (loading) {
//       // Optionally show a loading spinner or a placeholder
//       console.log("currently loading....");
//       return <div>Loading...</div>;
//     }

//     if (!session) {
//       console.log("ProtectedRoute Redirecting to /auth");
//       return <Navigate to="/auth" />;
//     }
  
//     return children;
// };
  
// export default ProtectedRoute;