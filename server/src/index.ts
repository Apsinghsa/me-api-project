import express, { type Request, type Response } from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`TS server running on : http://localhost:${PORT}/`);
});
