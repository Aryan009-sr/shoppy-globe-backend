import express from 'express';
import { body, param } from "express-validator";
import { protect } from "../middleware/auth.js";
import { addToCart, updateCartItem, removeFromCart, getCart} from "../controllers/cartController.js";

const router = express.Router();
router.use(protect);

//Get current user's cart (handy for testing/UI)
router.get("/", getCart);

//POST /cart
router.post (
    "/",
    [
        body("productId").isMongoId().withMessage("Valid productId is required"),
        body("quantity").isInt({ min: 1 }).withMessage("quantity >= 1 required")
    ],
    addToCart
);

//PUT /cart/:productId
router.put(
    "/:productId",
    [
        param("productId").isMongoId().withMessage("Valid productId is required"),
        body("quantity").isInt({min: 1}).withMessage("quantity >= 1 required")
    ],
    updateCartItem
);

//DELETE /cart/productId

router.delete(
    "/:productId",
    [
        param("productId").isMongoId().withMessage("Valid productId is required")
    ],
    removeFromCart
)
export default router;