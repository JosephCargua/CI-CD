import { useMemo } from "react";

function Header({ cart, removeElementFromCart, increaseQuantity, decreaseQuantity, clearCart }) {
   
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Aseguramos que se recalcule el costo total cuando el carrito cambie
    const totalCost = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);  // Dependencia de cart para que se recalculen los cálculos cuando cambie el carrito

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.png" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((videojuego) => (
                                                    <tr key={videojuego.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${videojuego.image}.png`} 
                                                                alt="imagen videojuego" />
                                                        </td>
                                                        <td>{videojuego.name}</td>
                                                        <td className="fw-bold">
                                                            ${videojuego.price.toFixed(2)}  {/* Asegúrate de mostrar siempre 2 decimales */}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button type="button" className="btn btn-dark" onClick={() => decreaseQuantity(videojuego.id)}>
                                                                -
                                                            </button>
                                                            {videojuego.quantity}
                                                            <button type="button" className="btn btn-dark" onClick={() => increaseQuantity(videojuego.id)}>
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" type="button" onClick={() => removeElementFromCart(videojuego.id)}>
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total a pagar: <span className="fw-bold">${totalCost.toFixed(2)}</span></p>
                                    </>
                                )}
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
