import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BooksPage from './pages/BooksPage'; // Assuming this is where you show books
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartSummary from './components/CartSummary'; // Import the cart summary
import ToastNotification from "./components/Toast"; // Import the Toast component
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      {/* CartProvider wraps the entire app, so cart data is available globally */}
      <CartProvider>
        <Router>
          {/* Cart Summary is available on every page */}
          <CartSummary />
          <ToastNotification /> {/* Display toast notification */}
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
