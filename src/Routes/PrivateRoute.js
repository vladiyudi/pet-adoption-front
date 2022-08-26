import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContexts";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { verifyUser } = useAuthContext();

  useEffect(() => {
    const verify = async () => {
      const user = await verifyUser();
      if (!user) navigate("/");
    };
    verify();
  }, []);

  return children;
}
