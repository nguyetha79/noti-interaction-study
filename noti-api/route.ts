import express from "express";
import { addNotification } from "./controller/notificationController";
import { getLatinSquare, updateLatinSquare } from "./controller/latinSquareController";

const router = express.Router();
router.post("/api/notifications", addNotification);

router.post("/api/latinsquare", updateLatinSquare);
router.get("/api/latinsquare", getLatinSquare);

export default router;
