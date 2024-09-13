import { Router } from "express";
import { ClashController } from "../controllers/ClashController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
const clashController = new ClashController();
//* create route
router
    .route("/")
    .post(authMiddleware, clashController.createclash);
//* update
router
    .route("/:id")
    .put(authMiddleware, clashController.updateClash);
//* get
router
    .route("/")
    .get(authMiddleware, clashController.get);
router
    .route("/:id")
    .get(clashController.getSingle);
router
    .route("/:id")
    .delete(authMiddleware, clashController.delete);
//*Clash Items routes
router
    .route("/items")
    .post(clashController.items);
export default router;
