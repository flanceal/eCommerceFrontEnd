import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartService from './application/services/cart.service';
import ProductService from './application/services/product.service';
import About from './components/About';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
import { Products } from './components/Products';
import { Profile } from './components/Profile';
import CartHttpAdapter from './infrastructure/http/adapters/cart.adapter';
import ProductHttpAdapter from './infrastructure/http/adapters/product.adapter';
import { CartServiceProvider } from './presentation/context/cart.service.provider';
import { ProductServiceProvider } from './presentation/context/product.service.provider';

const queryClient = new QueryClient();

const productService: ProductService = new ProductService(
  new ProductHttpAdapter(`${import.meta.env.VITE_BASE_API_URL}/products`, axios)
);

const cartService: CartService = new CartService(
  new CartHttpAdapter(`${import.meta.env.VITE_BASE_API_URL}/cart`, axios)
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div
        className={
          'max-w-screen-xl w-full flex flex-col h-full px-3 sm:px-12 lg:px-8 xl:px-16 mb-32 '
        }
      >
        <QueryClientProvider client={queryClient}>
          <ProductServiceProvider service={productService}>
            <CartServiceProvider service={cartService}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </CartServiceProvider>
          </ProductServiceProvider>
        </QueryClientProvider>
      </div>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
