import express, { type Request, type Response } from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(express.json());

// Local
if (process.env.NODE_ENV !== "production") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}

// Vercel
module.exports = app;
