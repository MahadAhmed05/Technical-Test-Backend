import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import userRoutes from "./routes/authRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Server working ✔"));

// Routes
// app.use("/api/v1/auth", userRoutes);
// API routes
app.use("/api/v1/weather/get-weather", weatherRoutes);

const PORT = parseInt(process.env.PORT, 10) || 3000;

const startServer = async () => {
  try {
    // await connectDB();

    // Start server - binding to all interfaces for better compatibility
    const server = app.listen(PORT, () => {
      const address = server.address();
      console.log(`\n✅ Server is running!`);
      console.log(`📍 Access at: http://localhost:${PORT}`);
      console.log(`📍 Or try: http://127.0.0.1:${PORT}`);
      if (address) {
        console.log(
          `📍 Server listening on: ${address.address}:${address.port}`
        );
      }
      console.log();
    });

    // Handle server errors
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `❌ Port ${PORT} is already in use. Please use a different port.`
        );
      } else if (error.code === "EACCES") {
        console.error(
          `❌ Permission denied on port ${PORT}. Ports below 1024 require admin privileges.`
        );
        console.error(
          `💡 Try using a port above 1024 (like 3000, 5000, or 8000)`
        );
      } else {
        console.error("❌ Server error:", error);
      }
      process.exit(1);
    });

    // Handle process termination
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down server...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
