import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const getCommentsByBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const comments = await Comment.find({ blog: blog._id })
      .populate("author", "username email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const { content } = req.body;
    if (!content || !content.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Comment content is required" });
    }

    const comment = await Comment.create({
      blog: blog._id,
      author: req.user._id,
      authorName: req.user.username,
      content: content.trim(),
    });

    const populated = await Comment.findById(comment._id).populate(
      "author",
      "username email role",
    );

    res.status(201).json({
      success: true,
      message: "Comment added",
      comment: populated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (String(comment.blog) !== String(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Comment not found on this blog",
      });
    }

    const isOwner = String(comment.author) === String(req.user._id);
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comments",
      });
    }

    await comment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
