"use client";

import { useFetch } from "@/lib/useFetch";
import Link from "next/link";

export default function Home() {
  const { data, isPending, error } = useFetch("/api.json");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isPending) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xato: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Commerce</h1>

      <div
        className="
        grid 
        gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
      >
        {data?.products.map((prod) => (
          <div key={prod.id} className="card bg-base-100 shadow-sm">
            <Link href={`/singleproduct/${prod.id}`}>
              <figure>
                <img
                  className="prodImage w-full h-48 object-cover "
                  src={prod.thumbnail}
                  alt={prod.title}
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">
                  {prod.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {prod.description}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Sotib olish {prod.price} So'm
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
