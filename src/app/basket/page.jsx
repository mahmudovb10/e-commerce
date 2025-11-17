"use client";

import { useGlobalContext } from "@/context/GlobalContext";

export default function BasketPage() {
  const { cart, cartTotal } = useGlobalContext();

  if (!cart || cart.length === 0) return <p>Savatcha bo‘sh</p>;

  return (
    <div className="container">
      <h1 className="basket__title">Savatcha</h1>
      <div>
        {cart.map((prod) => (
          <div key={prod.id}>
            <div className="basket__prod__cart">
              <div className="basket__left">
                <img className="basket__prod__img" src={prod.thumbnail} />
                <h2 className="basket__title">{prod.title}</h2>
              </div>

              <div className="basket__right">
                <p className="basket__prod__price">Narxi: {prod.price} so‘m</p>
                <p className="basket__prod__numb">Soni: x{prod.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>Jami: {cartTotal} som</p>
    </div>
  );
}
