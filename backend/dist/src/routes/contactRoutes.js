"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const db_1 = require("../config/db");
const zod_1 = require("zod");
const contactRouter = (0, express_1.Router)();
const contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    phone: zod_1.z.string().min(7, "Invalid phone number"),
});
const contactUpdateSchema = contactSchema.partial();
contactRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error,
        });
    }
    try {
        const contact = yield db_1.prisma.contact.create({
            data: parsed.data,
        });
        return res.status(201).json({ success: true, data: contact });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false });
    }
}));
contactRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield db_1.prisma.contact.findMany();
        return res.status(200).json({ success: true, data: contacts });
    }
    catch (_a) {
        return res.status(500).json({ success: false });
    }
}));
contactRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const contact = yield db_1.prisma.contact.findUnique({
            where: { id },
        });
        if (!contact) {
            return res.status(404).json({ success: false });
        }
        return res.status(200).json({ success: true, data: contact });
    }
    catch (_a) {
        return res.status(400).json({ success: false });
    }
}));
contactRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error,
        });
    }
    try {
        const contact = yield db_1.prisma.contact.update({
            where: { id },
            data: parsed.data,
        });
        return res.status(200).json({ success: true, data: contact });
    }
    catch (_a) {
        return res.status(404).json({ success: false });
    }
}));
contactRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const parsed = contactUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error,
        });
    }
    try {
        const contact = yield db_1.prisma.contact.update({
            where: { id },
            data: parsed.data,
        });
        return res.status(200).json({ success: true, data: contact });
    }
    catch (_a) {
        return res.status(404).json({ success: false });
    }
}));
contactRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield db_1.prisma.contact.delete({ where: { id } });
        return res.status(200).json({ success: true });
    }
    catch (_a) {
        return res.status(404).json({ success: false });
    }
}));
exports.default = contactRouter;
