const mongoose = require("mongoose");
const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");

function createAuth() {
  const db = mongoose.connection.db;
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!db) {
    throw new Error("MongoDB is not connected. Connect DB before auth setup.");
  }

  const authConfig = {
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    trustedOrigins: [frontendURL],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }) => {
        console.log(`Password reset link for ${user.email}: ${url}`);
      },
    },
  };

  if (googleClientId && googleClientSecret) {
    authConfig.socialProviders = {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    };
    console.log("Google auth provider enabled");
  } else {
    console.log("Google auth provider not enabled (missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET)");
  }

  return betterAuth(authConfig);
}

module.exports = { createAuth };
