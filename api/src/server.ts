import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import apiRoutes from "./routes/api";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();

// Connect to MongoDB
connectDB();

// Middleware - CORS Configuration


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint (CRITICAL)
app.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api", apiRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Resume API Playground - TypeScript Edition",
    version: "2.0.0",
    endpoints: {
      health: "/health",
      profile: "/api/profile",
      projects: "/api/projects",
      search: "/api/search?q=keyword",
    },
    documentation: "See README.md for complete API documentation",
  });
});

// 404 handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start server
const PORT: number = parseInt(process.env.PORT || "5000", 10);



// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});



// Local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("=".repeat(50));
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log("=".repeat(50));
  });
}

// Vercel
export default app;
