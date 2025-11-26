const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running Successfully 🚀");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
const products = [
    { id: 1, name: "T-Shirt", price: 20, image: "img1.jpg" },
    { id: 2, name: "Shoes", price: 50, image: "img2.jpg" },
    { id: 3, name: "Watch", price: 30, image: "img3.jpg" }
];

app.get("/products", (req, res) => {
    res.json(products);
});
let cart = [];

app.post("/add-to-cart", (req, res) => {
    cart.push(req.body);
    res.json({ message: "Item added to cart", cart });
});
app.get("/cart", (req, res) => {
    res.json(cart);
});
app.post("/checkout", (req, res) => {
    cart = [];  // cart reset
    res.json({ message: "Order placed successfully!" });
});
fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(data => {
        console.log(data); // products vandudum
    });
