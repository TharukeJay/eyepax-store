import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cartList")) || [];
      setCartList(savedCart);
    } catch {
      setCartList([]);
      localStorage.removeItem("cartList");
    }
  }, []);

  const handleQuantityChange = (index, value) => {
    const qty = parseInt(value) || 1;
    const updated = [...cartList];
    updated[index].quantity = qty;
    setCartList(updated);
  };

  const handleRemove = (index) => {
    const updated = cartList.filter((_, i) => i !== index);
    setCartList(updated);
    localStorage.setItem("cartList", JSON.stringify(updated));
  };

  const calculateTotal = () =>
    cartList
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="container">
      <h1> Cart </h1>

      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Store
      </button>

      {cartList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Price ($)</th>
              <th>Quantity</th>
              <th>Total ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.unitPrice.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(i, e.target.value)}
                  />
                </td>
                <td>{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="remove-btn" onClick={() => handleRemove(i)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                Grand Total:
              </td>
              <td colSpan="2">${calculateTotal()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
