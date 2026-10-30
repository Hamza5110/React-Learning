import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true },
);

lessonSchema.index({ course: 1, order: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
