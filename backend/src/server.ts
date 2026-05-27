import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes"

const app = express();

// TODO: Change to env file
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes)

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

app.get("/api/hello", (_req, res) => {
  res.status(200).json({
    message: "Hello from the backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
