/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import fsPromises from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import postModel from '../models/post.model.js';

class PostService {
  async createPost(data) {
    const post = await postModel.create(data);
    return post;
  }

  async getPosts() {
    const posts = await postModel.find();
    return posts;
  }

  async getUserPostById(id) {
    const posts = await postModel.find({ _userId: id });
    return posts;
  }

  async getPostById(id) {
    const posts = await postModel.findById(id);
    return posts;
  }

  async getPostByCategory(data) {
    const posts = await postModel.find({ category: data });
    return posts;
  }

  async findByTitle(title) {
    const post = await postModel.find({ title });
    return post;
  }

  async deletePosts(id) {
    const posts = await postModel.deleteOne({ _id: id });
    return posts;
  }

  async findAndDeletePostById(id) {
    const postId = await postModel.findByIdAndDelete(id);
    return postId;
  }

  async uploadImage({ file }) {
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: 'image',
      folder: 'pictures'
    });
  }

  async updatePost(id, data) {
    const post = await postModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });

    return post;
  }

  async getAllDrafts() {
    const post = await postModel.find({ isPublished: false });
    return post;
  }

  async deleteFile(file) {
    // if the file exist
    await fsPromises.access(file.path);
    await fsPromises.unlink(file.path);
  }
}

export default new PostService();
