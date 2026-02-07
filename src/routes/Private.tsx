import { auth } from "../services/firebaseConnection";

import { onAuthStateChanged } from "firebase/auth";
import { type ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };

        localStorage.setItem("@linktree", JSON.stringify(userData));
        setSigned(true);
      } else {
        setSigned(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

