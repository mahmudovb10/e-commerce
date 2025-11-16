"use client";

import { useEffect, useState } from "react";

export default function BasketPage() {
  const [cart, setCart] = useState([]);

  // Sahifa yuklanganda localStorage dan cartni olish
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Savatcha</h1>

      {cart.length === 0 ? (
        <p>Savatcha bo‘sh</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 p-4 shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>{item.price} so‘m</p>
              </div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => removeFromCart(index)}
              >
                O‘chirish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
