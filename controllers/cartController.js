import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

// helper: ensure a cart exists for a user
const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

// ---------------------- ADD TO CART ----------------------
export const addToCart = async (req , res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (quantity > product.stock) return res.status(400).json({ message: "Insufficient Stock" });

  const cart = await ensureCart(req.user._id);
  const idx = cart.items.findIndex((i) => i.product.equals(product._id));

  if (idx > -1) {
    // product already exists in cart → update quantity
    const newQty = cart.items[idx].quantity + quantity;
    if (newQty > product.stock) return res.status(400).json({ message: "Insufficient stock" });
    cart.items[idx].quantity = newQty;
  } else {
    // new product → save snapshot of name & price too
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  await cart.save();
  res.status(201).json({
    message: "Product added to cart successfully",
    cart
  });
};

// ---------------------- UPDATE CART ITEM ----------------------
export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) return res.status(400).json({ message: "Quantity must be > 0" });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (quantity > product.stock) return res.status(400).json({ message: "Insufficient stock" });

  const cart = await ensureCart(req.user._id);
  const idx = cart.items.findIndex((i) => i.product.equals(product._id));
  if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

  // update quantity only (name & price already stored)
  
  cart.items[idx].name = product.name;
  cart.items[idx].price = product.price;
  cart.items[idx].quantity = quantity;


  await cart.save();
  res.json({
    message: "Cart item updated successfully",
    cart
  });
};

// ---------------------- REMOVE CART ITEM ----------------------
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await ensureCart(req.user._id);
  const before = cart.items.length;
  cart.items = cart.items.filter((i) => !i.product.equals(productId));

  if (cart.items.length === before) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  await cart.save();
  res.json({
    message: "Item removed from cart successfully",
    cart
  });
};

// ---------------------- GET CART ----------------------
export const getCart = async (req, res) => {
  const cart = await ensureCart(req.user._id);
  res.json(cart);
};
