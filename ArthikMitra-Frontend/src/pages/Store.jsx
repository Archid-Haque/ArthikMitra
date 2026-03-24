import React from "react";
import { useNavigate } from "react-router-dom";
import "./store.css";

const products = [
  {
    id: 1,
    name: "Finance Mastery Modules",
    price: 999,
    oldPrice: 1499,
    tag: "Bestseller",
    image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
  },
  {
    id: 2,
    name: "Wealth Blueprint",
    price: 499,
    oldPrice: 799,
    tag: "Trending",
    image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
  },
  {
    id: 3,
    name: "Money Growth Guide",
    price: 599,
    oldPrice: 999,
    tag: "Premium",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
  },
  {
    id: 4,
    name: "ArthikMitra T-Shirt",
    price: 499,
    oldPrice: 899,
    tag: "Hot",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  },
  {
    id: 5,
    name: "Student Backpack",
    price: 799,
    oldPrice: 1299,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
  },
  {
    id: 6,
    name: "Premium Notebook",
    price: 199,
    oldPrice: 399,
    tag: "Sale",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: 7,
    name: "Pen + Pencil Kit",
    price: 149,
    oldPrice: 299,
    tag: "Combo",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    id: 8,
    name: "Desk Organizer",
    price: 299,
    oldPrice: 599,
    tag: "Budget",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
  },
];

export default function Store() {
  const navigate = useNavigate();

  return (
    <div className="store-page">

      {/* BACK BUTTON */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* TITLE */}
      <h1 className="title">
        <span className="neon">ArthikMitra</span> Store
      </h1>

      {/* GRID */}
      <div className="grid">
        {products.map((item) => (
          <div key={item.id} className="card">

            <div className="tag">{item.tag}</div>

            <div className="img-box">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="info">
              <h3>{item.name}</h3>

              <div className="price">
                <span className="new">₹{item.price}</span>
                <span className="old">₹{item.oldPrice}</span>
              </div>

              <div className="buttons">
                <button className="cart">Add</button>
                <button
                  className="order"
                  onClick={() => navigate("/checkout")}
                >
                  Order
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}