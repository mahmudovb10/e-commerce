"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();
  const redirectedRef = useRef(false);

  const publicRoutes = ["/login", "/register"];

  useEffect(() => {
    console.log("ProtectedRoute:", { loading, user, pathname });

    if (publicRoutes.includes(pathname)) return;

    if (!loading && !user && !redirectedRef.current) {
      redirectedRef.current = true;
      router.replace("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        Authentifikatsiya tekshirilmoqda...
      </div>
    );
  }

  if (publicRoutes.includes(pathname)) {
    return children;
  }

  if (user) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
