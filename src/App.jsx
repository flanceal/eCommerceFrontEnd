import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home.jsx';
import { Products } from './components/Products.jsx';
import { About } from './components/About.jsx';
import { Header } from './components/Header.jsx';
import { ProductDetails } from './components/ProductDetails.jsx';
import { Cart } from './components/Cart.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product, quantity) {
    setCart((prevCart) => [...prevCart, { ...product, quantity }]);
  }

  function removeFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function increaseProductQuantity(product) {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== product.id);
      return [...newCart, { ...product, quantity: product.quantity + 1 }];
    });
  }

  function decreaseProductQuantity(product) {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== product.id);
      return [...newCart, { ...product, quantity: product.quantity - 1 }];
    });
  }

  console.log(cart);

  return (
    <BrowserRouter>
      <Header />
      <div
        className={
          'max-w-screen-xl w-full flex flex-col h-full px-3 sm:px-12 lg:px-16'
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route path="/about-us" element={<About />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseProductQuantity={increaseProductQuantity}
                decreaseProductQuantity={decreaseProductQuantity}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
