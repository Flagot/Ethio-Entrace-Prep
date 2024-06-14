const mongoose = require("mongoose");
const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");

function createAuth() {
  const db = mongoose.connection.db;
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!db) {
    throw new Error("MongoDB is not connected. Connect DB before auth setup.");
  }

  return betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    trustedOrigins: [frontendURL],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
  });
}

module.exports = { createAuth };
