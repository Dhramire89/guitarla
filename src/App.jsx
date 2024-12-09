import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Guitar from "./Components/Guitar";
import { db } from "./data/data";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const MaxItems = 5;

  // Funtion para agregar productos al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    // si devuelve -1 significa que el carrito esta vacio y agrega el producto
    if (itemExists < 0) {
      item.quantity = 1; // nuevo atributo que se le agrega el obj item
      setCart([...cart, item]); // se le agrega el articulo al carrito manteniendo los datos anteriores
      console.log("se agrego");
      // si ya existe, solo le suma 1 a la cantidad del producto
    } else {
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      console.log("Ya existe...");
    }
  }

  // Funcion para eliminar productos del carrito
  function removeFromCart(id) {
    setCart((prevCar) => prevCar.filter((guitar) => guitar.id !== id));
  }

  // Funtion para incrementar las cantidades del carrito
  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity < MaxItems) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } // se tienen que devolver completos los items que no se modificaron
      return item;
    });
    setCart(updateCart); // se actializa con las nuevas cantidades
  }
  // Funtion para incrementar las cantidades del carrito
  function decrementQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity > 1) {
        // limita que continue decrementando
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } // se tienen que devolver completos los items que no se modificaron
      return item;
    });
    setCart(updateCart); // se actializa con las nuevas cantidades
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
      />

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
