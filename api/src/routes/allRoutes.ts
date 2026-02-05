import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from backend!!");
});
router.get("/read", (req: Request, res: Response) => {});
router.put("/update", (req: Request, res: Response) => {});
router.post("/create", (req: Request, res: Response) => {});

export default router;
