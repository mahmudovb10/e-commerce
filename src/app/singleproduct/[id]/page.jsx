"use client";

import React from "react"; // React.use() dan foydalanish uchun
import { useFetch } from "@/lib/useFetch"; // Sizning original importingiz
console.log(1);

function SingleProduct({ params }) {
  let resolvedParams = params;
  if (typeof params?.then === "function") {
    resolvedParams = React.use(params);
  }

  const { id } = resolvedParams;

  const { data, isPending, error } = useFetch(`/api.json`);

  if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (error) {
    return <p>Xatolik yuz berdi + {error.message}</p>;
  }

  const prod = data?.prod?.find((p) => String(p.id) === String(id));

  if (!prod) {
    return <p>Mahsulot topilmadi (Qidirilgan ID: {id})</p>;
  }

  return (
    <div>
      <h1>{prod.title}</h1>
    </div>
  );
}

export default SingleProduct;
