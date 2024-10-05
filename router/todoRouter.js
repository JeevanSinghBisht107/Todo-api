import { Router } from "express";
import { addtodo, deletetodo, fetchAlltodo, updatetodo } from "../controllers/todoController.js";

const router = Router();

router.post("/add",addtodo);
router.get("/all",fetchAlltodo);
router.put("/update/:id",updatetodo);
router.delete("/delete/:id",deletetodo)

export default router;