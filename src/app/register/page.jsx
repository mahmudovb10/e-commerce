"use client";

import { useState, useEffect } from "react";
// Next.js navigatsiyasi
import { useRouter } from "next/navigation";
// Next.js Link
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { registerUser, loginWithGoogle, loginAnonymously, user, loading } =
    useGlobalContext();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Parol kamida 6 belgidan iborat bo'lishi kerak.");
      return;
    }

    try {
      await registerUser(email, password);
    } catch (err) {
      setError("Ro'yxatdan o'tishda xato: " + err.message);
    }
  };

  const handleGoogleAction = async () => {
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(
        "Google orqali ro'yxatdan o'tishda xato: " +
          (err.message || "Boshqa xato.")
      );
    }
  };

  const handleAnonymousAction = async () => {
    setError(null);
    try {
      await loginAnonymously();
    } catch (err) {
      setError("Anonim kirishda xato: " + err.message);
    }
  };

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Yuklanmoqda / Yo'naltirilmoqda...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Yangi Akkaunt</h2>

        {error && (
          <div role="alert" className="alert alert-error mb-4">
            <svg viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Email input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="E-mail manzilingiz"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Parol input */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Parol (min. 6 belgi)</span>
            </label>
            <input
              type="password"
              placeholder="Parol yarating"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-secondary w-full">
              Email orqali Ro'yxatdan O'tish
            </button>
          </div>
        </form>

        <div className="divider">Yoki tezroq ro'yxatdan o'tish</div>

        <button
          className="btn btn-outline w-full mb-3"
          onClick={handleGoogleAction}
        >
          {/* Google icon SVG */}
          <svg
            aria-label="Google logo"
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path fill="#fff" d="m0 0H512V512H0" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Google orqali Ro'yxatdan O'tish
        </button>

        <button
          className="btn btn-outline w-full"
          onClick={handleAnonymousAction}
        >
          {/* Anonim icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a7.5 7.5 0 00-11.963 0M12 12a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            />
          </svg>
          Mehmon sifatida kirish (Anonim)
        </button>

        <p className="text-center mt-6 text-sm">
          Akkauntingiz bormi? {/* Link href ishlatilishi shart */}
          <Link href="/login" className="link link-primary">
            Tizimga kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
