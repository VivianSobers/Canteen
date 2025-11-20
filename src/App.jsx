import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function VideoBackground() {
  return (
    <video autoPlay loop muted playsInline className="background-video">
      <source src="./background.mp4" type="video/mp4" />
    </video>
  );
}
function Home() {
  return (
    <div className="home">
      <VideoBackground />
      <div className="overlay-text">
        <h1>PES FOOD COURTS</h1>
        <div className="button-container">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </div>
      </div>
    </div>
  );
}

function Login({ setLoggedIn, setUserData }) {
  const [form, setForm] = useState({ srn: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/breakfast");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <VideoBackground />
      <div className="overlay-text">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            name="srn" 
            placeholder="SRN" 
            value={form.srn} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="/" className="back-btn">← Back</Link>
      </div>
    </div>
  );
}

function Signup() {
  const [form, setForm] = useState({ name: "", srn: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
  
      const checkResponse = await fetch(`${API_URL}/check-srn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ srn: form.srn })
      });

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setError("This SRN is already registered. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <VideoBackground />
      <div className="overlay-text">
        <h1>Signup</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Full Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="srn" 
            placeholder="SRN" 
            value={form.srn} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <Link to="/" className="back-btn">← Back</Link>
      </div>
    </div>
  );
}
function Header({ cartCount }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentHour = new Date().getHours();
  const isLunchDisabled = currentHour < 11;

  return (
    <header className="header">
      <div className="logo">PES FOOD COURTS</div>
      <div className="menu-switch">
        <Link
          to="/breakfast"
          className={currentPath === "/breakfast" ? "active-link" : ""}
        >
          🍳 Breakfast
        </Link>
        <span className="divider">|</span>
        {isLunchDisabled ? (
          <span className="disabled-link">🍱 Lunch</span>
        ) : (
          <Link
            to="/lunch"
            className={currentPath === "/lunch" ? "active-link" : ""}
          >
            🍱 Lunch
          </Link>
        )}
      </div>
      <Link to="/checkout" className="cart">
        🛒 Cart ({cartCount})
      </Link>
    </header>
  );
}
function MenuPage({ title, menuItems, cart, setCart }) {
  const handleAdd = (item) => {
    setCart((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
  };

  const handleRemove = (item) => {
    setCart((prev) => {
      if (!prev[item]) return prev;
      const newCart = { ...prev };
      if (newCart[item] === 1) delete newCart[item];
      else newCart[item]--;
      return newCart;
    });
  };

  return (
    <div className="menu-page">
      <Header cartCount={Object.values(cart).reduce((a, b) => a + b, 0)} />
      <main className="menu-container">
        <h1>{title}</h1>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item.img} alt={item.name} className="menu-img" />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              {cart[item.name] ? (
                <div className="quantity-control">
                  <button onClick={() => handleRemove(item.name)}>-</button>
                  <span>{cart[item.name]}</span>
                  <button onClick={() => handleAdd(item.name)}>+</button>
                </div>
              ) : (
                <button className="add-btn" onClick={() => handleAdd(item.name)}>
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Breakfast({ cart, setCart }) {
  const menuItems = [
  { name: "Idli Vada", price: "₹50", img: "../images/idli_vada.jpg" },
  { name: "Idli", price: "₹40", img: "../images/idli.jpg" },
  { name: "Vada", price: "₹35", img: "../images/vada.jpg" },
  { name: "Dosa", price: "₹60", img: "../images/dosa.jpg" },
  { name: "Set Dosa", price: "₹65", img: "../images/set_dosa.jpg" },
  { name: "Upma", price: "₹45", img: "../images/upma.jpg" },
  { name: "Chow Chow Bath", price: "₹55", img: "../images/chowchow_bath.jpg" },
  { name: "Pongal", price: "₹50", img: "../images/pongal.jpg" },
  { name: "Uthappam", price: "₹65", img: "../images/uthappam.jpg" },
  { name: "Bisibele Bath", price: "₹60", img: "../images/bisibele_bath.jpg" },
  { name: "Omelette", price: "₹40", img: "../images/omelette.jpg" },
  { name: "Sandwich", price: "₹55", img: "../images/sandwich.jpg" },
  { name: "Tea", price: "₹20", img: "../images/tea.jpg" },
  { name: "Coffee", price: "₹25", img: "../images/coffee.jpg" },
  { name: "Orange Juice", price: "₹40", img: "../images/oj.jpg" }
];


  return <MenuPage title="Breakfast Menu" menuItems={menuItems} cart={cart} setCart={setCart} />;
}

function Lunch({ cart, setCart }) {
const menuItems = [
  { name: "Chapathi", price: "₹40", img: "../images/chapathi.jpg" },
  { name: "Paratha", price: "₹45", img: "../images/paratha.jpg" },
  { name: "Parotta", price: "₹50", img: "../images/parotta.jpg" },
  { name: "Ceylon Parotta", price: "₹60", img: "../images/ceylon_parotta.jpeg" },
  { name: "Garlic Naan", price: "₹55", img: "../images/garlic_naan.jpg" },
  { name: "Dal Makhani", price: "₹80", img: "../images/dal_makhani.jpg" },
  { name: "Palak Paneer", price: "₹100", img: "../images/palak_paneer.jpg" },
  { name: "Paneer Butter Masala", price: "₹110", img: "../images/paneer_butter_masala.jpg" },
  { name: "Kaju Masala", price: "₹120", img: "../images/kaju_masala.jpg" },
  { name: "Green Peas Curry", price: "₹90", img: "../images/green_peas_curry.jpg" },
  { name: "Fried Rice", price: "₹80", img: "../images/fried_rice.jpg" },
  { name: "Jeera Rice", price: "₹70", img: "../images/jeera_rice.jpg" },
  { name: "Pulav", price: "₹75", img: "../images/pulav.jpg" },
  { name: "Ghee Rice", price: "₹70", img: "../images/ghee_rice.jpg" },
  { name: "Curd Rice", price: "₹60", img: "../images/curd_rice.jpg" },
  { name: "Lemon Rice", price: "₹60", img: "../images/lemon_rice.jpg" },
  { name: "Schezwan Noodles", price: "₹90", img: "../images/schezwan_noodles.jpg" },
  { name: "Paneer Manchurian", price: "₹100", img: "../images/paneer_manchurian.jpg" },
  { name: "Babycorn Manchurian", price: "₹100", img: "../images/babycorn.jpg" },
  { name: "Gobi Manchurian", price: "₹85", img: "../images/gobi_manchurian.jpg" },
  { name: "North Indian Meals", price: "₹130", img: "../images/north_indian_meals.jpg" },
  { name: "South Indian Meals", price: "₹120", img: "../images/south_indian_meals.jpg" },
  { name: "Pappad", price: "₹20", img: "../images/pappad.jpg" },
  { name: "Salad", price: "₹25", img: "../images/salad.jpg" },
  { name: "Water Bottle", price: "₹15", img: "../images/water.png" }
];

  return <MenuPage title="Lunch Menu" menuItems={menuItems} cart={cart} setCart={setCart} />;
}

function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ['#ff6b00', '#ffd700', '#ff1744', '#00e676', '#2979ff'][Math.floor(Math.random() * 5)],
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Checkout({ cart, setCart, userData }) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const priceMap = {
    "Idli Vada": 50, "Idli": 40, "Vada": 35, "Dosa": 60, "Set Dosa": 65,
    "Upma": 45, "Chow Chow Bath": 55, "Pongal": 50, "Uthappam": 65,
    "Bisibele Bath": 60, "Omelette": 40, "Sandwich": 55, "Tea": 20,
    "Coffee": 25, "Orange Juice": 40, "Chapathi": 40, "Paratha": 45,
    "Parotta": 50, "Ceylon Parotta": 60, "Garlic Naan": 55, "Dal Makhani": 80,
    "Palak Paneer": 100, "Paneer Butter Masala": 110, "Kaju Masala": 120,
    "Green Peas Curry": 90, "Fried Rice": 80, "Jeera Rice": 70, "Pulav": 75,
    "Ghee Rice": 70, "Curd Rice": 60, "Lemon Rice": 60, "Schezwan Noodles": 90,
    "Paneer Manchurian": 100, "Babycorn Manchurian": 100, "Gobi Manchurian": 85,
    "North Indian Meals": 130, "South Indian Meals": 120, "Pappad": 20,
    "Salad": 25, "Water Bottle": 15,
  };

  const imageMap = {
    "Idli Vada": "../images/idli_vada.jpg", "Idli": "./images/idli.jpg", "Vada": "./images/vada.jpg",
    "Dosa": "./images/dosa.jpg", "Set Dosa": "./images/set_dosa.jpg", "Upma": "./images/upma.jpg",
    "Chow Chow Bath": "./images/chowchow_bath.jpg", "Pongal": "./images/pongal.jpg",
    "Uthappam": "./images/uthappam.jpg", "Bisibele Bath": "./images/bisibele_bath.jpg",
    "Omelette": "./images/omelette.jpg", "Sandwich": "./images/sandwich.jpg",
    "Tea": "./images/tea.jpg", "Coffee": "./images/coffee.jpg", "Orange Juice": "./images/oj.jpg",
    "Chapathi": "./images/chapathi.jpg", "Paratha": "./images/paratha.jpg",
    "Parotta": "./images/parotta.jpg", "Ceylon Parotta": "./images/ceylon_parotta.jpeg",
    "Garlic Naan": "./images/garlic_naan.jpg", "Dal Makhani": "./images/dal_makhani.jpg",
    "Palak Paneer": "./images/palak_paneer.jpg", "Paneer Butter Masala": "./images/paneer_butter_masala.jpg",
    "Kaju Masala": "./images/kaju_masala.jpg", "Green Peas Curry": "./images/green_peas_curry.jpg",
    
    "Fried Rice": "./images/fried_rice.jpg", "Jeera Rice": "./images/jeera_rice.jpg",
    "Pulav": "./images/pulav.jpg", "Ghee Rice": "./images/ghee_rice.jpg",
    "Curd Rice": "./images/curd_rice.jpg", "Lemon Rice": "./images/lemon_rice.jpg",
    "Schezwan Noodles": "./images/schezwan_noodles.jpg", "Paneer Manchurian": "./images/paneer_manchurian.jpg",
    "Babycorn Manchurian": "./images/babycorn.jpg", "Gobi Manchurian": "./images/gobi_manchurian.jpg",
    "North Indian Meals": "./images/north_indian_meals.jpg", "South Indian Meals": "./images/south_indian_meals.jpg",
    "Pappad": "./images/pappad.jpg", "Salad": "./images/salad.jpg", "Water Bottle": "./images/water.png",
  };

  const items = Object.entries(cart);
  const subtotal = items.reduce((sum, [name, qty]) => sum + (priceMap[name] || 0) * qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const deliveryFee = 0;
  const total = subtotal + gst + deliveryFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const saveOrderToDatabase = async (orderNumber, otp) => {
    try {
      const orderItems = items.map(([name, qty]) => ({
        name,
        quantity: qty,
        price: priceMap[name]
      }));

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userData.name,
          srn: userData.srn,
          orderNumber,
          otp,
          items: orderItems,
          totalAmount: total
        })
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', 
      amount: total * 100,
      currency: 'INR',
      name: 'PES FOOD COURTS',
      description: 'Order Payment',
      image: '/logo.png',
      handler: async function (response) {
        console.log('Payment Successful:', response);
        setShowConfetti(true);
        setOrderPlaced(true);
        
        const orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000);
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        
        await saveOrderToDatabase(orderNumber, otp);
        
        setTimeout(() => {
          setShowConfetti(false);
          navigate(`/order-status/${orderNumber}/${otp}`);
          setCart({});
        }, 3000);
      },
      prefill: {
        name: userData.name,
        email: `${userData.srn}@pes.edu`,
        contact: '9999999999'
      },
      theme: {
        color: '#ff6b00'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled by user');
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="menu-page">
      <Header cartCount={items.reduce((a, b) => a + b[1], 0)} />
      {showConfetti && <Confetti />}
      
      <main className="menu-container">
        {orderPlaced ? (
          <div className="order-success">
            <div className="success-emoji">🎉</div>
            <h1 className="success-title">Order Placed Successfully!</h1>
            <p className="success-subtitle">Your delicious food is on its way! 🍽️</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-emoji">🛒</div>
            <h2 className="empty-cart-title">Your cart is empty!</h2>
            <p className="empty-cart-subtitle">Add some delicious items to get started</p>
            <Link to="/breakfast" className="browse-menu-btn">
              Browse Menu 🍴
            </Link>
          </div>
        ) : (
          <div className="checkout-content">
            <h1 className="checkout-title">🛍️ Your Order</h1>
            <p className="checkout-subtitle">Review your items before placing order</p>

            <div className="checkout-items">
              {items.map(([name, qty], index) => (
                <div key={index} className="checkout-item-card">
                  <img src={imageMap[name]} alt={name} className="checkout-item-image" />
                  <div className="checkout-item-info">
                    <h3>{name}</h3>
                    <p className="checkout-item-qty">Qty: {qty} × ₹{priceMap[name]}</p>
                  </div>
                  <div className="checkout-item-price">
                    ₹{qty * priceMap[name]}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-total-card">
              <div className="bill-summary">
                <h2 className="bill-title">Bill Summary</h2>
                <div className="bill-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="bill-row">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="bill-divider"></div>
                <div className="bill-row bill-total">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <button className="place-order-btn" onClick={handlePayment}>
                💳 Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function OrderStatus() {
  const { orderNumber, otp } = useParams();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const totalTime = 15 * 60;
    const elapsed = totalTime - timeRemaining;
    const newProgress = (elapsed / totalTime) * 100;
    setProgress(newProgress);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusMessage = () => {
    if (progress < 30) 
      return "🍳 Preparing your order...";
    if (progress < 70) 
      return "👨‍🍳 Cooking in progress...";
    if (progress < 100) 
      return "📦 Almost ready!";
    return "✅ Order Ready for Pickup!";
  };

  const getStatusColor = () => {
    if (progress < 30) 
      return "#00fffbff";
    if (progress < 70) 
      return "#e8acedff";
    if (progress < 100) 
      
      3
      return "#78ff42ff";
    return "#4caf50";
  };

  return (
    <div className="menu-page">
      <Header cartCount={0} />
      <main className="menu-container">
        <div className="order-status-container">
          <div className="order-status-header">
            <div className="success-checkmark">✓</div>
            <h1 className="order-status-title">Order Confirmed!</h1>
            <p className="order-status-subtitle">Your delicious meal is being prepared</p>
          </div>

          <div className="order-details-card">
            <div className="order-info-row">
              <div className="order-info-item">
                <span className="order-info-label">Order Number</span>
                <span className="order-number-value">{orderNumber}</span>
              </div>
              <div className="order-info-divider"></div>
              <div className="order-info-item">
                <span className="order-info-label">Pickup OTP</span>
                <span className="otp-value">{otp}</span>
              </div>
            </div>
          </div>

          <div className="timer-card">
            <div className="timer-status" style={{ color: getStatusColor() }}>
              {getStatusMessage()}
            </div>
            <div className="timer-display">{formatTime(timeRemaining)}</div>
            <div className="timer-label">Estimated time remaining</div>
            
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: getStatusColor()
                }}
              ></div>
            </div>
          </div>

          <div className="order-instructions">
            <h3>📋 Instructions</h3>
            <ul>
              <li>Show your <strong>Order Number</strong> and <strong>OTP</strong> at the counter</li>
              <li>Your order will be ready in approximately 15 minutes</li>
              <li>Please collect your order before the timer ends</li>
            </ul>
          </div>

          <button 
            className="back-to-menu-btn" 
            onClick={() => navigate('/breakfast')}
          >
            🏠 Back to Menu
          </button>
        </div>
      </main>
    </div>
  );
}
function App() {
  const [cart, setCart] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserData={setUserData} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/breakfast" element={<Breakfast cart={cart} setCart={setCart} />} />
      <Route path="/lunch" element={<Lunch cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} userData={userData} />} />
      <Route path="/order-status/:orderNumber/:otp" element={<OrderStatus />} />
    </Routes>
  );
}

export default App;