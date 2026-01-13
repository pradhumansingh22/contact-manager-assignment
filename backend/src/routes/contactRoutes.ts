import "dotenv/config";
import { Router } from "express";
import { prisma } from "../config/db";
import { z } from "zod";

const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone number"),
});

const contactUpdateSchema = contactSchema.partial();

contactRouter.post("/", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error,
    });
  }

  try {
    const contact = await prisma.contact.create({
      data: parsed.data,
    });

    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});

contactRouter.get("/", async (_req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    return res.status(200).json({ success: true, data: contacts });
  } catch {
    return res.status(500).json({ success: false });
  }
});

contactRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({ success: false });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch {
    return res.status(400).json({ success: false });
  }
});

contactRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error,
    });
  }

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: parsed.data,
    });

    return res.status(200).json({ success: true, data: contact });
  } catch {
    return res.status(404).json({ success: false });
  }
});

contactRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const parsed = contactUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error,
    });
  }

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: parsed.data,
    });

    return res.status(200).json({ success: true, data: contact });
  } catch {
    return res.status(404).json({ success: false });
  }
});

contactRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.contact.delete({ where: { id } });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(404).json({ success: false });
  }
});

export default contactRouter;
