import React from "react";
import useUser from "../../hooks/useUser";
import { Navigate } from "react-router-dom";
import { PATH } from "../../constants/path";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const userAuth = useUser();

  if (userAuth === undefined) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
