import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home.jsx';
import { Products } from './components/Products.jsx';
import { About } from './components/About.jsx';
import { Header } from './components/Header.jsx';
import { ProductDetails } from './components/ProductDetails.jsx';

function App() {
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
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
