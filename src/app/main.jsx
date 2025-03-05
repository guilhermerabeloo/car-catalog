import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Catalog from '../components/Catalog.jsx'
import Estoque from '../components/Estoque.jsx'
import CadastrarCarro from '../components/CadastrarCarro.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/catalogo" replace />
      },
      {
        path: 'catalogo',
        element: <Catalog />
      },
      {
        path: 'estoque',
        element: <Estoque />
      },
      {
        path: 'cadastrar-carro',
        element: <CadastrarCarro />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)