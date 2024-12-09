import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Guitar from "./Components/Guitar";
import { db } from "./data/data";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

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
      if (cart[itemExists].quantity >= MAX_ITEMS) return; // para evitar que se agregen mas cantidades desde la pantalla principal
      updateCart[itemExists].quantity++;
      setCart(updateCart);
      console.log("Ya existe...");
    }
  }

  // Funcion para eliminar productos del carrito
  function removeFromCart(id) {
    setCart((prevCar) => prevCar.filter((guitar) => guitar.id !== id));
  }

  // Funtion para Incrementar las cantidades del carrito
  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } // se tienen que devolver completos los items que no se modificaron
      return item;
    });
    setCart(updateCart); // se actializa con las nuevas cantidades
  }
  // Funtion para Decrementar las cantidades del carrito
  function decreaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity > MIN_ITEMS) {
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

  // Funtion para vaciar el carrito de compras
  function cleanCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
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
