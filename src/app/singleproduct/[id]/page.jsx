"use client";

import React from "react";
import { useFetch } from "@/lib/useFetch";
import Link from "next/link";

function SingleProduct({ params }) {
  // Get id
  let resolvedParams = params;
  if (typeof params?.then === "function") {
    resolvedParams = React.use(params);
  }
  // Get id
  const { id } = resolvedParams;
  // Get API
  const { data, isPending, error } = useFetch(`/api.json`);
  // Waiting procces
  // Error procces
  if (error) {
    return <p>Xatolik yuz berdi + {error.message}</p>;
  }
  // Finding a printed product
  const prod = data?.products?.find((p) => String(p.id) === String(id));
  // If the product is not available
  if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>;
  }
  if (!prod) {
    console.log("Mahsulot topilmadi. Data:", data);
    // If such a product is not available
    if (!data || !data.products) {
      return <p>API ma'lumotlari yuklanmadi yoki noto'g'ri tuzilgan.</p>;
    }

    return <p>Mahsulot topilmadi (Qidirilgan ID: {id})</p>;
  }

  return (
    <div className="mt-[5rem]">
      <img className="singleProdImg" src={prod.thumbnail} alt={prod.title} />
      <h1 className="singleProdTitle">{prod.title}</h1>
      <p className="singleProdDesc">{prod.description}</p>
      <hr className="singleProdHr" />
      <br />
      <br />
      <h2 className="singleProdRate">Baho: {prod.rating}⭐</h2>
      <h2 className="singleProdStock">Qolgan: {prod.stock} dona</h2>
      <h2 className="singleProdCategory">Kategoriya: {prod.categorySlug}</h2>
      <div>
        <Link href={`/clearance/${prod.id}`}>
          <button className="btn btn-outline btn-primary singleProdClearance">
            Rasmiylashtirish
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;
