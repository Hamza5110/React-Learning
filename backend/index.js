import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth_route.js";
import blogRoutes from "./routes/blog_route.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Vite default
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running")
    );
  })
  .catch((err) => console.error(err));