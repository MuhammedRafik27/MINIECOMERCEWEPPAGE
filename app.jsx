const products = [
  {
    id: 1,
    name: "Pulse Headphones",
    tag: "Audio",
    price: 79.99,
    icon: "🎧",
    accent: "#34d6ff",
    description: "Crisp wireless sound with soft cushions and a futuristic matte finish."
  },
  {
    id: 2,
    name: "Orbit Smartwatch",
    tag: "Wearable",
    price: 129.5,
    icon: "⌚",
    accent: "#b8f05f",
    description: "Track workouts, calls, and day-to-day goals from a bright edge display."
  },
  {
    id: 3,
    name: "Glow Keyboard",
    tag: "Desk",
    price: 94.25,
    icon: "⌨️",
    accent: "#ff6b8b",
    description: "Low-profile mechanical keys with animated backlight and fast response."
  },
  {
    id: 4,
    name: "Snap Camera",
    tag: "Creator",
    price: 214.99,
    icon: "📷",
    accent: "#ffd166",
    description: "Compact creator camera with clean video, sharp photos, and quick sharing."
  }
];

function App() {
  const [cart, setCart] = React.useState({});
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartEntries = Object.entries(cart);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);

  const addToCart = (id) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  };

  const increaseQuantity = (id) => {
    setCart((current) => ({ ...current, [id]: current[id] + 1 }));
  };

  const decreaseQuantity = (id) => {
    setCart((current) => {
      const next = { ...current };
      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const totals = cartEntries.reduce(
    (summary, [id, quantity]) => {
      const product = products.find((item) => item.id === Number(id));
      return {
        items: summary.items + quantity,
        total: summary.total + product.price * quantity
      };
    },
    { items: 0, total: 0 }
  );

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Animated shopping prototype</p>
          <h1>NovaCart</h1>
          <p className="subtitle">
            A mini e-commerce cart system with live quantity control, instant removal,
            and glowing total calculation.
          </p>
        </div>
        <button className="cart-toggle" type="button" onClick={() => setIsCartOpen(true)}>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{totals.items}</span>
        </button>
      </section>

      <section className="store-layout">
        <div className="products-zone">
          <div className="section-heading">
            <p>Product list</p>
            <h2>Featured drops</h2>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className="product-card"
                key={product.id}
                style={{ "--accent": product.accent, animationDelay: `${index * 90}ms` }}
              >
                <div>
                  <div className="product-art">
                    <span>{product.icon}</span>
                  </div>
                  <span className="tag">{product.tag}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="product-bottom">
                  <strong className="price">{formatMoney(product.price)}</strong>
                  <button className="add-btn" type="button" onClick={() => addToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className={`cart-panel ${isCartOpen ? "open" : ""}`}>
          <div className="cart-header">
            <div>
              <p>Your cart</p>
              <h2>Order capsule</h2>
            </div>
            <button className="close-cart" type="button" onClick={() => setIsCartOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cartEntries.length === 0 ? (
              <div className="empty-cart">Your cart is waiting for its first product.</div>
            ) : (
              cartEntries.map(([id, quantity]) => {
                const product = products.find((item) => item.id === Number(id));
                return (
                  <article className="cart-item" key={id} style={{ "--accent": product.accent }}>
                    <div className="cart-thumb">{product.icon}</div>
                    <div className="cart-info">
                      <h3>{product.name}</h3>
                      <p className="cart-price">{formatMoney(product.price)} each</p>
                      <div className="cart-actions">
                        <div className="qty-controls">
                          <button type="button" onClick={() => decreaseQuantity(product.id)}>−</button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                        <button className="remove-btn" type="button" onClick={() => removeFromCart(product.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Items</span>
              <strong>{totals.items}</strong>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong>{formatMoney(totals.total)}</strong>
            </div>
            <button className="checkout-btn" type="button">Checkout</button>
          </div>
        </aside>
      </section>
    </main>
  );
}
