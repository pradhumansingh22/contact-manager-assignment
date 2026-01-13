"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://192.168.1.100:3000"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));
app.use(express_1.default.json());
app.use("/api/user", authRoutes_1.default);
app.use("/api/contacts", contactRoutes_1.default);
app.listen(3000, "0.0.0.0", () => {
    console.log("Server listening on port 3000");
});
