"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

export default function dashboard() {
  const { user, logOutUser } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOutUser();
      router.push("/login");
    } catch (err) {
      console.log("Logout error " + err.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}
