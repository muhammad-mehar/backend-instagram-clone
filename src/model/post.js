import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    likes: {
      type: "number",
      default: 0,
    },
    share: {
      type: "number",
      default: 0,
    },
    comments: [
      {
        comment_text: {
          type: "string",
          required: true,
        },
        dateTime: { type: Date, default: Date.now },
      },
    ],
    user_id: {
      type: mongoose.Schema.ObjectId, 
      ref: "users",
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("posts", postSchema);

export default postModel;
