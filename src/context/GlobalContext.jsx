"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  deleteUser,
} from "firebase/auth";

import { auth } from "@/firebase/config";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // register user
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Logout user
  const logoutUser = () => {
    return signOut(auth);
  };
  // Delete user
  const deleteAndLogoutUser = async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        await signOut(auth);
        console.log("User deleted and system logout");
      } catch (err) {
        console.log("User deleted error " + err.message);

        await signOut(auth);
        throw err;
      }
    }
  };

  const deleteProd = (id) => {
    const updateCard = cart.filter((item) => item.id !== id);
    setCart(updateCard);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  //  LocalStorage ga yozish
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // product add basket
  const addCart = (product) => {
    setCart((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    console.log("Mahsulot qo'shildi " + product.title);
  };
  // total count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  // total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginAnonymously = () => {
    return signInAnonymously(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.getIdToken(true);

          setUser(currentUser);
          console.log("Token tasdiqlandi. Kirgan: ", currentUser.uid);
        } catch (error) {
          console.error(
            "Token tasdiqlashda xato: Foydalanuvchi o'chirilgan.",
            error.message
          );

          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    loginAnonymously,
    logoutUser,
    deleteAndLogoutUser,
    cartCount,
    cart,
    addCart,
    cartTotal,
    cartCount,
    deleteProd,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
