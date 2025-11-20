import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Use the same CSS file

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const handleRemove = (item) => {
    setCart((prev) => {
      if (!prev[item]) return prev;
      const newCart = { ...prev };
      if (newCart[item] === 1) delete newCart[item];
      else newCart[item]--;
      return newCart;
    });
  };

  const handleAdd = (item) => {
    setCart((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
  };

  const handleCheckout = () => {
    alert("Order placed successfully!");
    setCart({});
    navigate("/");
  };

  const cartItems = Object.keys(cart);
  const total = cartItems.reduce((sum, item) => sum + cart[item] * 50, 0); // Replace 50 with real price if needed

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="checkout-container">
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <span className="item-name">{item}</span>
              <div className="quantity-control">
                <button onClick={() => handleRemove(item)}>-</button>
                <span>{cart[item]}</span>
                <button onClick={() => handleAdd(item)}>+</button>
              </div>
              <span className="item-price">₹{cart[item] * 50}</span>
            </div>
          ))}
          <div className="checkout-total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
export default Checkout;