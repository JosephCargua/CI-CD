import React from 'react';

function OrderSummary({ cart, totalCost }) {
    return (
        <div className="order-summary">
            <h4>Resumen de la compra</h4>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <table className="w-100 table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((videojuego) => (
                                <tr key={videojuego.id}>
                                    <td>
                                        <img
                                            className="img-fluid"
                                            src={`/img/${videojuego.image}.png`}
                                            alt={videojuego.name}
                                        />
                                    </td>
                                    <td>{videojuego.name}</td>
                                    <td>${videojuego.price.toFixed(2)}</td>
                                    <td>{videojuego.quantity}</td>
                                    <td>${(videojuego.price * videojuego.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-end">
                        <strong>Total a pagar: </strong> ${totalCost.toFixed(2)}
                    </p>
                </>
            )}
        </div>
    );
}

export default OrderSummary;
