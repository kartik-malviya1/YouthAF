import express from "express";
import Blog from "../models/Blog.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:type", async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.type });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // create blog with image
// router.post("/", auth, upload.single("image"), async (req, res) => {
//   try {
//     const { title, content, category, eventDate } = req.body;

//     const blog = new Blog({
//       title,
//       content,
//       category,
//       eventDate,
//       image: req.file?.path,
//     });

//     await blog.save();

//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// update blog
// router.put("/:id", auth, upload.single("image"), async (req, res) => {
//   try {
//     const updateData = {
//       ...req.body,
//     };

//     if (req.file) {
//       updateData.image = req.file.path;
//     }

//     const updated = await Blog.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// delete blog
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Blog deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;