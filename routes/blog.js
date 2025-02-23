const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const blogDB = mongoose.createConnection(process.env.MONGO_URI_BLOG)
    .on("connected", () => console.log("Connected to MongoDB (BlogDB)"))
    .on("error", (err) => console.error("MongoDB connection error (BlogDB):", err));

const router = express.Router();

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Blog = blogDB.model("Blog", BlogSchema);

router.get("/", async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

router.post("/", async (req, res) => {
    const { title, body, author } = req.body;
    if (!title || !body || !author) return res.status(400).json({ error: "All fields are required" });

    const blog = new Blog({ title, body, author });
    await blog.save();
    res.status(201).json(blog);
});

router.put("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    blog ? res.json(blog) : res.status(404).json({ error: "Post not found" });
});

router.delete("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    blog ? res.json({ message: "Post deleted" }) : res.status(404).json({ error: "Post not found" });
});

module.exports = router;
