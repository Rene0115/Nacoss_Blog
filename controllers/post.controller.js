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
      image: result.url
    };

    if (req.user.verified === false) {
      return res.status(400).send({
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
}

export default new PostController();
