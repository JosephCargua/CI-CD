import React from 'react';

export default function Videojuego({ videojuego, addToCart }) {
   const { id, name, price, image, description } = videojuego;

   return (
       <div className="col-md-6 col-lg-4 my-4 row align-items-center">
           <div className="col-4">
               
               <img 
                   className="img-fluid d-block mx-auto" 
                   style={{ height: '150px', objectFit: 'cover' }} 
                   src={`/img/${image}.png`} 
                   alt={`Imagen del videojuego ${name}`} 
               />
           </div>
           <div className="col-8">
               <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
               <p style={{ textAlign: 'justify' }}>{description}</p>
               <p className="fw-black text-primary fs-3">${price}</p>
               
               <button 
                   type="button" 
                   className="btn btn-dark w-100" 
                   onClick={() => addToCart(videojuego)}
               >
                   Agregar al Carrito
               </button>
           </div>
       </div>
   );
}
