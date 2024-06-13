require("dotenv").config();

const express = require("express");
const { toNodeHandler } = require("better-auth/node");
const { createAuth } = require("./auth");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Server is running" });
});

async function startServer() {
  try {
    await connectDB();
    const auth = createAuth();

    app.all("/api/auth/*splat", toNodeHandler(auth));

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
