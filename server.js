import express from "express";
import { json } from "body-parser";
import { PrismaClient } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(json());

app.post("/users", async (req, res) => {
  const { email, name, mobile, password } = req.body;

  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, name, mobile, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await compare(password, user.password))) {
    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
});

const authenticateJWT = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (token) {
    verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/expenses", authenticateJWT, async (req, res) => {
  const { amount, method, splitDetails } = req.body;
  const userId = req.user.id;

  try {
    const expense = await prisma.expense.create({
      data: { amount, method, userId, splitDetails },
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: "Invalid expense data" });
  }
});

app.get("/expenses/:userId", authenticateJWT, async (req, res) => {
  const expenses = await prisma.expense.findMany({
    where: { userId: Number(req.params.userId) },
  });
  res.json(expenses);
});

app.get("/expenses", authenticateJWT, async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
