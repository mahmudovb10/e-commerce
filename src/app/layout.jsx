"use client";

import ProtectedRoute from "@/lib/ProtectedRoute";
import { GlobalContextProvider } from "@/context/GlobalContext";
import Link from "next/link";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let title = "My App";

    if (pathname === "/") title = "Home - Commerce";
    else if (pathname === "/login") title = "Login - Commerce";
    else if (pathname === "/register") title = "Register - Commerce";
    else if (pathname === "/singleproduct") title = "Singe prod";
    else if (pathname.startsWith("/dashboard")) title = "Dashboard - Commerce";

    document.title = title;
  }, [pathname]);
  return (
    <html lang="en" data-theme="light">
      <body>
        <GlobalContextProvider>
          <ProtectedRoute>
            <div className="main__layout min-h-screen flex flex-col">
              <header className="header bg-base-300 p-4 shadow-md">
                <Link href="#">Dashboard</Link>
              </header>

              <main className="main flex-grow p-4">{children}</main>

              <footer className="footer bg-neutral text-neutral-content p-4 mt-auto">
                <p>
                  Copyright © {new Date().getFullYear()} - All right reserved
                </p>
              </footer>
            </div>
          </ProtectedRoute>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
