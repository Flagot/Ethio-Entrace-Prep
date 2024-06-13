const mongoose = require("mongoose");
const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");

function createAuth() {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB is not connected. Connect DB before auth setup.");
  }

  return betterAuth({
    database: mongodbAdapter(db),
  });
}

module.exports = { createAuth };
