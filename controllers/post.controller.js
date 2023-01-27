/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';
import _ from 'lodash';
import postService from '../services/post.services.js';

class PostController {
  async createPost(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const data = {
      title: req.body.title,
      userId: req.user._id,
      body: req.body.body,
      image: result.url,
      category: req.body.category
    };
    if (_.isEmpty(data.title || data.body || data.category)) {
      return res.status(404).send({
        success: false,
        message: 'Title, Body and Category are required to create a post'
      });
    }

    if (req.user.verified === false) {
      return res.status(404).send({
        success: false,
        message: 'Verify your account before attempting to create a post'
      });
    }
    const post = await postService.createPost(data);
    return res.status(201).send({
      status: true,
      message: 'post created successfully',
      data: post
    });
  }

  async deletePost(req, res) {
    const post = await postService.findAndDeletePostById(req.body.id);
    if (_.isEmpty(post)) {
      res.status(404).send({
        status: false,
        message:
          'Post does not exist, pleaase create a post before attempting to delete a post'
      });
    }
    res.status(200).send({
      success: true,
      message: 'Post deleted successfully'
    });
  }

  async like(req, res) {
    const post = await postService.getPostById(req.body.id);
    if (_.isEmpty(post)) {
      res.status(404).send({
        success: false,
        message: 'Post does not exist'
      });
    }
    post.likes += 1;
    await post.save();
    if (post.likes === 1) {
      return res.status(200).send({
        success: true,
        message: 'This post was liked one time'
      });
    }
    if (post.likes === 0) {
      return res.status(200).send({
        success: true,
        message: 'This post has not been liked'

      });
    }
    return res.status(200).send({
      success: true,
      message: `This post was liked ${post.likes} times.`
    });
  }

  async updateTitle(req, res) {
    const post = await postService.getPostById(req.body.id);
    const newTitle = req.body.title;
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post with this Id does not exist.'
      });
    }
    if (post) {
      await post.updateOne({ title: newTitle });
    }
    return res.status(200).send({
      success: true,
      message: `Your new post title is ${newTitle}`
    });
  }

  async updateBody(req, res) {
    const post = await postService.getPostById(req.body.id);
    const newBody = req.body.body;
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post with this Id does not exist.'
      });
    }
    if (post) {
      await post.updateOne({ body: newBody });
    }
    return res.status(200).send({
      success: true,
      message: 'Post body was updated successfully'
    });
  }

  async updateCategory(req, res) {
    const post = await postService.getPostById(req.body.id);
    const newCategory = req.body.category;
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post with this Id does not exist.'
      });
    }
    if (post) {
      await post.updateOne({ category: newCategory });
    }
    return res.status(200).send({
      success: true,
      message: `Post category was changed to ${newCategory}`
    });
  }

  async getPosts(req, res) {
    const post = await postService.getPosts();
    if (_.isEmpty(post)) {
      return res.status(200).send({
        staus: true,
        message: 'no posts found'
      });
    }
    return res.status(200).send({
      status: true,
      data: post
    });
  }

  async postByTitle(req, res) {
    const post = await postService.findByTitle(req.body.title);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'No post with this title exists'
      });
    }

    return res.status(201).send({
      success: true,
      data: post
    });
  }

  async getPostByCategories(req, res) {
    const post = await postService.getPostByCategory(req.body.category);

    if (!post) {
      res.status(404).send({
        status: false,
        message: 'no post exists with this category'
      });
    }
    res.status(200).send({
      status: true,
      data: post
    });
  }

  async getPostById(req, res) {
    const posts = await postService.getPostById(req.body.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({
        status: false,
        body: 'Post does not exist'
      });
    }

    return res.status(200).send({
      status: true,
      data: posts
    });
  }
}

export default new PostController();
