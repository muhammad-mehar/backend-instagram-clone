import postModel from "../model/post.js";
import userModel from "../model/user.js";

const postController = {
  getAll: async (req, res) => {
    try {
      // Also validate all function using JOi 
      // pagination concept of limit and skip
      // skip((pageNo-1)*limit).limit(limit)
      //
      //
      const skipValue = req.query.skip || 0;
      const limitValue = req.query.limit || 1;
      const posts = await postModel
        .find()
        .populate("user_id")
        .sort("-createdAt")
        .skip(skipValue)
        .limit(limitValue);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error while fetching!" });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id).populate("user_id");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error while fetching!" });
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body;
      const post = await postModel.create({
        title: body.title,
        description: body.description,
        user_id: body.user_id,
      });
      return res.status(200).json({ message: "Post created", post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error while creating" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await userModel.findById(id).populate("user_id");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const body = req.body;
      const updatedPost = await postModel.create({
        title: body.title,
        description: body.description,
        user_id: body.user_id,
      });
      return res.status(200).json({ message: "Post updated", updatedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error while updating" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id).populate("user_id");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const delPost = await postModel.deleteOne({ post });

      return res.status(200).json({ message: "post deleted", delPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error While deleting" });
    }
  },
  postLikeDislike: async (req, res) => {
    const likedUserArray = [];
    const action = req.params.action;
    try {
      if (action === "like") {
        this.likes += 1;
        likedUserArray.push(userId);
      } else if (action === "dislike") {
        this.likes -= 1;
        likedUserArray.pop(userId);
      }
      await this.save();
      return res.status(200).json({ message: "post liked!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error while handling the request" });
    }
  },
  comment: async (req, res) => {
    try {
      this.comments.push({
        comment_text: commentText,
        user_id: userId,
      });
      await this.save();
      return res.json({ message: "comment posted!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "error while handling request" });
    }
  },
  findbyUserEmail: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }else if(user) {
        const posts = await postModel.find({ user_id: user._id }).populate("user_id");
        console.log("Posts Found by the given email!")
        return res.status(200).json(posts);
      }else{
        return res.status(404).json({ message: `User has ${posts.length} found.` });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  },
};

export default postController;
