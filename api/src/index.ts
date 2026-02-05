import express, { type Request, type Response } from "express";
import cors from "cors";
import router from "./routes/allRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

// Local
if (process.env.NODE_ENV !== "production") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}

// Vercel
export default app;
