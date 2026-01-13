import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import contactRouter from "./routes/contactRoutes";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.100:3000"],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/api/user", authRouter);
app.use("/api/contacts", contactRouter);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server listening on port 3000");
});

