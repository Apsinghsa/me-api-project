import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Local
if (process.env.NODE_ENV !== "production") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}

// Vercel
export default app;
