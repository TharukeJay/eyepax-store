import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const inventory = [
    { name: 'bacon', unitPrice: 10.99, quantity: 10 },
    { name: 'eggs', unitPrice: 3.99, quantity: 10 },
    { name: 'cheese', unitPrice: 6.99, quantity: 10 },
    { name: 'chives', unitPrice: 1.0, quantity: 10 },
    { name: 'wine', unitPrice: 11.99, quantity: 10 },
    { name: 'brandy', unitPrice: 17.55, quantity: 10 },
    { name: 'bananas', unitPrice: 0.69, quantity: 10 },
    { name: 'ham', unitPrice: 2.69, quantity: 10 },
    { name: 'tomatoes', unitPrice: 3.26, quantity: 10 },
    { name: 'tissue', unitPrice: 8.45, quantity: 10 },
  ];

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

  const handleCartAdd = (item) => {
    const savedCart = JSON.parse(localStorage.getItem("cartList")) || [];
    const existing = savedCart.find((i) => i.name === item.name);
    let updatedCart;

    if (existing) {
      updatedCart = savedCart.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...savedCart, { ...item, quantity: 1 }];
    }

    setCartList(updatedCart);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <h1> Grocery Store </h1>

      <button className="cart-btn" onClick={() => navigate("/cart")}>
        Go to Cart ({cartList.length})
      </button>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Price ($)</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="add-btn" onClick={() => handleCartAdd(item)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;