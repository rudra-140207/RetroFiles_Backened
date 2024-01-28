import express from "express";

import {
  cards,
  createCard,
  allCard,
  deleteCard,
  editCard,
  cardById,
  updateLike,
  setCookie,
  verifyCookie,
  operations
} from "../controllers/cards.js";

const router = express.Router();

router.get("/", cards);
router.post("/new-card", createCard);
router.get("/all-card", allCard);
router.delete("/delete", deleteCard);
router.put("/edit-card/:id", editCard);
router.get("/card-id/:id", cardById);
router.post("/like", updateLike);
router.post("/set-cookie",setCookie);
router.post("/verify-cookie" ,verifyCookie);
router.post("/operation",operations);

export default router;
