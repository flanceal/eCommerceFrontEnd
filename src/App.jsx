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

  // TODO: improve readability and efficiency of addToCart, increaseProductQuantity, decreaseProductQuantity

  function addToCart(product, amount) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      adjustProductQuantity(product, amount);
    } else {
      setCart([...cart, { ...product, quantity: amount }]);
    }
  }

  function adjustProductQuantity(product, amount) {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + amount }
          : item
      );
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function increaseProductQuantity(product) {
    adjustProductQuantity(product, 1);
  }

  function decreaseProductQuantity(product) {
    adjustProductQuantity(product, -1);
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
