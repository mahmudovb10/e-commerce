"use client";

import React from "react";
import { useFetch } from "@/lib/useFetch";

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

  const prod = data?.products?.find((p) => String(p.id) === String(id));

  if (!prod) {
    console.log("Mahsulot topilmadi. Data:", data);

    if (!data || !data.products) {
      return <p>API ma'lumotlari yuklanmadi yoki noto'g'ri tuzilgan.</p>;
    }

    return <p>Mahsulot topilmadi (Qidirilgan ID: {id})</p>;
  }

  return (
    <div>
      <img className="singleProdImg" src={prod.thumbnail} alt={prod.title} />
      <h1 className="singleProdTitle">{prod.title}</h1>
      <p className="singleProdDesc">{prod.description}</p>
      <hr className="singleProdHr" />
      <br />
      <br />
      <h2 className="singleProdRate">Baho: {prod.rating}⭐</h2>
      <h2 className="singleProdStock">Qolgan: {prod.stock} dona</h2>
      <h2 className="singleProdCategory">Kategoriya: {prod.categorySlug}</h2>
    </div>
  );
}

export default SingleProduct;
