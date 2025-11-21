"use client";

import React from "react";
import { useFetch } from "@/lib/useFetch";

function ClearancePage({ params }) {
  let resolveParams = params;
  if (typeof params?.then === "function") {
    resolveParams = React.use(params);
  }

  const { id } = resolveParams;
  const { data, isPending, error } = useFetch("/api.json");

  // Fake professional delivery time generator
  const now = new Date();
  const minTime = new Date(now.getTime() + 40 * 60000)
    .toTimeString()
    .slice(0, 5);
  const maxTime = new Date(now.getTime() + 60 * 60000)
    .toTimeString()
    .slice(0, 5);

  // Fake data for professionalism
  const deliveryPrice = 7000;
  const serviceFee = 1000;
  const courier = {
    name: "Sherzod A.",
    rating: "4.9",
    vehicle: "Velosiped",
  };
  const orderID = Math.floor(100000 + Math.random() * 900000);

  if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (error) {
    return <p>Xatolik yuz berdi + {error.message}</p>;
  }

  const prod = data?.products?.find((p) => String(p.id) === String(id));

  if (!prod) {
    if (!data || !data.products) {
      return <p>API ma'lumotlari yuklanmadi yoki noto'g'ri tuzilgan.</p>;
    }
    return <p>Mahsulot topilmadi (Qidirilgan ID: {id})</p>;
  }

  return (
    <div className="mt-12 p-4  container">
      <img
        className="w-full rounded-xl mb-4 clearance__Img"
        src={prod.thumbnail}
        alt={prod.title}
      />

      <div className="clearance__data">
        <h1 className="text-2xl font-bold mb-2">{prod.title}</h1>

        <div className="bg-gray-100 p-4 rounded-xl mb-6 dark:bg-black">
          <h2 className="text-lg font-semibold mb-2">Buyurtma holati</h2>

          <ul className="steps steps-vertical">
            <li className="step step-primary">Buyurtma qabul qilindi</li>
            <li className="step step-primary">Ovqat tayyorlanmoqda</li>
            <li className="step step-primary">Kuryer tayinlandi</li>
            <li className="step">Kuryer yo‘lda</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 mb-4 dark:bg-black">
          <h2 className="text-lg font-semibold mb-1">Yetkazib berish vaqti</h2>
          <p className="text-gray-700 dark:text-white">
            ⏱ Taxminiy yetib borish:{" "}
            <b>
              {minTime} – {maxTime}
            </b>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 mb-4 dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">Narxlar</h2>
          <p>
            Mahsulot narxi: <b>{prod.price} so'm</b>
          </p>
          <p>
            Yetkazib berish narxi: <b>{deliveryPrice} so'm</b>
          </p>
          <p>
            Xizmat haqi: <b>{serviceFee} so'm</b>
          </p>
          <hr className="my-2" />
          <p className="text-xl font-bold">
            Jami: {prod.price + deliveryPrice + serviceFee} so'm
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl mb-4 dark:bg-black">
          <h2 className="text-lg font-semibold mb-2">Sizning kuryeringiz</h2>
          <p>
            🚴‍♂️ <b>{courier.name}</b> — Reytingi: ⭐ {courier.rating}
          </p>
          <p>Transport: {courier.vehicle}</p>
        </div>

        <div className="text-center text-gray-600 mt-6">
          <p>
            Buyurtma raqami: <b>#{orderID}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClearancePage;
