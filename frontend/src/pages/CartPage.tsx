import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext"; // Import the custom hook
import { useNavigate } from "react-router-dom"; // Import the navigate hook

function CartPage() {
  const { cart, removeFromCart } = useCart(); // Get the cart and removeFromCart from context
  const navigate = useNavigate(); // Initialize the navigate hook

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity, // Calculate the total amount
    0
  );

  // Function to handle "Continue Shopping"
  const handleContinueShopping = () => {
    navigate("/"); // Navigate back to the BookList page
  };

  return (
    <>
      <WelcomeBand />
      <div style={{ padding: "20px" }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.book.bookID} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h4>{item.book.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.book.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.book.bookID)} // Remove item from cart
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
              <h4>Total: ${totalAmount.toFixed(2)}</h4>
            </div>
          </div>
        )}
        {/* Continue Shopping Button */}
        <button 
          style={{ marginTop: "20px" }} 
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default CartPage;
