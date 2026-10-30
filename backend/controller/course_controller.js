import Course from "../models/Course.js";
import { makeUniqueSlug, slugify } from "../utils/slugify.js";

const findCourseBySlug = (slug) => Course.findOne({ slug });

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    if (!title || !description || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const slug = await makeUniqueSlug(Course, slugify(title));
    const course = new Course({
      title,
      slug,
      description,
      price,
      image,
      instructor: req.user._id,
    });
    await course.save();
    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await findCourseBySlug(req.params.slug).populate(
      "instructor",
    );
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course: course.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user._id }).populate(
      "instructor",
      "username email",
    );
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await findCourseBySlug(req.params.slug);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const { title, description, price, image } = req.body;
    if (title !== undefined) {
      course.title = title;
      course.slug = await makeUniqueSlug(
        Course,
        slugify(title),
        course._id,
      );
    }
    if (description !== undefined) course.description = description;
    if (price !== undefined) course.price = price;
    if (image !== undefined) course.image = image;

    await course.save();
    res.status(200).json({ success: true, course: course.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ slug: req.params.slug });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await findCourseBySlug(req.params.slug);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    const alreadyEnrolled = course.students.some((id) =>
      id.equals(req.user._id),
    );
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }
    course.students.push(req.user._id);
    await course.save();
    res.status(200).json({
      success: true,
      message: "Enrolled in course successfully",
      course: course.toObject(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unenrollFromCourse = async (req, res) => {
  try {
    const course = await findCourseBySlug(req.params.slug);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    const isEnrolled = course.students.some((id) => id.equals(req.user._id));
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }
    course.students.pull(req.user._id);
    await course.save();
    res.status(200).json({
      success: true,
      message: "Unenrolled from course successfully",
      course: course.toObject(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createCourse,
  getCourses,
  getCourseBySlug,
  getMyCourses,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  unenrollFromCourse,
};
