import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // Accessing cart from context
  const [isFlashing, setIsFlashing] = useState(false); // State to manage flashing effect

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity, // Calculate the total amount
    0
  );

  useEffect(() => {
    if (cart.length > 0) {
      setIsFlashing(true); // Trigger flashing effect
      setTimeout(() => setIsFlashing(false), 1000); // Stop flashing after 1 second
    }
  }, [cart]); // Depend on cart to trigger flashing effect when it changes

  return (
    <div
      className={`cart-summary ${isFlashing ? 'flashing' : ''}`} // Apply flashing class when isFlashing is true
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      <i className="bi bi-cart" style={{ fontSize: '2rem' }}></i> {/* Bootstrap Cart Icon */}
      <strong> 🛒 ${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
