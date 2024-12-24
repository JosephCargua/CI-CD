import Videojuego from "./Components/Videojuego";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import { db } from "./data/db";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MetodoPago from './MetodoPago';  

function App() {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    // States
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    // Guardar carrito en localStorage cada vez que hay un cambio
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Funciones del carrito
    const addToCart = (item) => {
        const itemExist = cart.findIndex((videojuego) => videojuego.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return;
            const updateCart = [...cart];
            updateCart[itemExist].quantity++;
            setCart(updateCart);
        } else {
            // Agregar nuevo atributo "quantity"
            item.quantity = 1;
            setCart([...cart, item]);
        }
    };

    const removeElementFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((videojuego) => videojuego.id !== id));
    };

    const increaseQuantity = (id) => {
        const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updateCart);
    };

    const decreaseQuantity = (id) => {
        const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(updateCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const handlePayment = () => {
      // Lógica para manejar el pago, si es necesario
      console.log("Realizando el pago...");
  };
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header
                                cart={cart}
                                removeElementFromCart={removeElementFromCart}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                clearCart={clearCart}
                                handlePayment={handlePayment}
                            />
                            <main className="container-xl mt-5">
                                <h2 className="text-center">Nuestra Colección de Videojuegos PS5</h2>
                                <div className="row mt-5">
                                    {data.map((videojuego) => (
                                        <Videojuego
                                            key={videojuego.id}
                                            videojuego={videojuego}
                                            addToCart={addToCart}
                                        />
                                    ))}
                                </div>
                            </main>
                            <footer className="bg-dark mt-5 py-5">
                                <div className="container-xl">
                                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                                        GamerSquad - Todos los derechos Reservados
                                    </p>
                                </div>
                            </footer>
                        </>
                    }
                />
                <Route path="/MetodoPago" element={<MetodoPago />} />
            </Routes>
        </Router>
    );
}

export default App;
