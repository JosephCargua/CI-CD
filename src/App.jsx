import Videojuego from "./Components/Videojuego"
import Header from "./Components/Header"
import {useState, useEffect} from 'react'
import { db } from "./data/db";


function App() {

  const initialCart = () => {
    const localStorageCart= localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart): [];
  }

  //state
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS=5;
  const MIN_ITEMS=1;
  
  /*Si fuera una consulta de una Api*/
  //useEffect(() => {
  //   setData(db)
  //}, []); 

  //Guarda cada vez que hay un cambio en cart.
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])

  function addToCart(item){
    const itemExist= cart.findIndex((videojuego) => videojuego.id === item.id);
    if (itemExist >= 0){
      if(cart[itemExist].quantity >= MAX_ITEMS) return
      const updateCart=[...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    }else{
      //Agrego nuevo atributo, cantidad de atributos que quiero colocar
      item.quantity = 1
      //setCart ya sabe el estado de cart por eso lo uso
      setCart([...cart, item])
    }
    saveLocalStorage()
  }

  function removeElementFromCart(id){
    setCart(prevCart => prevCart.filter((videojuego) => videojuego.id !== id))
  }

  function increaseQuantity(id){
    const updateCart=cart.map(item =>{
      if(item.id == id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity+1
        }
      }
      return item;
    })
    setCart(updateCart);
  }

  function decreaseQuantity(id){
    const updateCart=cart.map(item=>{
      if(item.id == id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity-1
        }
      }
      return item
    })
    setCart(updateCart);
  }

  function clearCart(){
      setCart([])
  }

  return (
    <>
      {/* Renderizar componente de header */}
      <Header
        cart={cart}
        removeElementFromCart={removeElementFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      {/* Fin Renderizar componente de header */}
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección de Videojuegos PS5</h2>

        <div className="row mt-5">
          {data.map((videojuego)=> (
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
          <p className="text-white text-center fs-4 mt-4 m-md-0">GamerSquad - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
