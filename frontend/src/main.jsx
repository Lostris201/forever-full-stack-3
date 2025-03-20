import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

// React Router future flag'lerini ayarla
const router = createBrowserRouter(
  [
    {
      path: "*",
      element: (
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      ),
    },
  ],
  {
    // Gelecek sürümlerdeki değişikliklere uyum sağlamak için future flagleri ayarla
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
