import React from "react";
import { useState, useEfect } from "react";
import Header from "./Components/Header";
import Guitar from "./Components/Guitar";
import { db } from "./data/data";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists < 0) {
      item.quantity = 1;
      setCart([...cart, item]);
      console.log("se agrego");
    } else {
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      console.log("Ya existe...");
    }
  }
  return (
    <>
      <Header cart={cart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
