import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
import { Products } from './components/Products';
import { Profile } from './components/Profile';
import ICart from './types/cart.types';
import IProduct from './types/product.types';

function App() {
  const [cart, setCart] = useState<ICart[]>([]);

  function addToCart(product: IProduct, amount: number) {
    if (amount <= 0) return;
    const existingProduct = cart.find(
      (item: IProduct) => item.id === product.id
    );
    if (existingProduct) {
      adjustProductQuantity(product, amount);
    } else {
      setCart([...cart, { ...product, amount }]);
    }
  }

  function adjustProductQuantity(product: IProduct, amountToAdd: number) {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, amount: item.amount + amountToAdd }
          : item
      );
    });
  }

  function removeFromCart(productId: string) {
    setCart((prevCart) =>
      prevCart.filter((item: IProduct) => item.id !== productId)
    );
  }

  function increaseProductQuantityByOne(product: IProduct) {
    adjustProductQuantity(product, 1);
  }

  function decreaseProductQuantityByOne(product: IProduct) {
    adjustProductQuantity(product, -1);
  }

  console.log(cart);

  return (
    <BrowserRouter>
      <Header />
      <div
        className={
          'max-w-screen-xl w-full flex flex-col h-full px-3 sm:px-12 lg:px-8 xl:px-16 mb-32'
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
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseProductQuantity={increaseProductQuantityByOne}
                decreaseProductQuantity={decreaseProductQuantityByOne}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
