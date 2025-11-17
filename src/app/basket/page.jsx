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
                <button className="basket__prod__remove">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>Jami: {cartTotal} som</p>
    </div>
  );
}
