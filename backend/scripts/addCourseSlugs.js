import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import { makeUniqueSlug, slugify } from "../utils/slugify.js";

dotenv.config();

async function addCourseSlugs() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const courses = await Course.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
  });

  if (courses.length === 0) {
    console.log("No courses need a slug. Done.");
    await mongoose.disconnect();
    return;
  }

  console.log(`Found ${courses.length} course(s) without a slug`);

  for (const course of courses) {
    const base = slugify(course.title) || "course";
    const slug = await makeUniqueSlug(Course, base, course._id);
    course.slug = slug;
    await course.save();
    console.log(`✓ ${course.title} -> ${slug}`);
  }

  console.log("Slug migration finished.");
  await mongoose.disconnect();
}

addCourseSlugs().catch(async (err) => {
  console.error("Migration failed:", err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
