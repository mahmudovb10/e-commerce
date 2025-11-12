// src/lib/ProtectedRoute.jsx
"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      console.log(
        "ProtectedRoute: User topilmadi, /login ga yo'naltirilmoqda."
      );
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        Authentifikatsiya tekshirilmoqda...
      </div>
    );
  }

  if (user) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
