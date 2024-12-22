import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*Leer la etiqueta root del <div id="root"></div> 
y monta la aplicacion de react en ese div*/
ReactDOM.createRoot(document.getElementById('root')).render(
  //Archivo principal de la app de react
  <React.StrictMode>
    {/*Aplicacion montada*/}
    <App />
  </React.StrictMode>,
)
