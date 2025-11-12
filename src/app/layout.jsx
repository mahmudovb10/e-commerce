// src/app/layout.jsx (To'g'ri UI Layout)

import { GlobalContextProvider } from "@/context/GlobalContext";
import Link from "next/link";
import "./globals.css";

// ... metadata

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <GlobalContextProvider>
          {/* UI elementlar bu yerda tiklanadi */}
          <div className="main__layout min-h-screen flex flex-col">
            <header className="header bg-base-300 p-4 shadow-md">
              {/* ... Header kontenti ... */}
              <Link href="/dashboard">Dashboard</Link>
            </header>

            <main className="main flex-grow p-4">{children}</main>

            <footer className="footer bg-neutral text-neutral-content p-4 mt-auto">
              {/* ... Footer kontenti ... */}
              <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </footer>
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
// Eslatma: src/components/MainLayout.jsx faylini o'chirib yuborish tavsiya etiladi.
