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
    const body = {
      title: req.body.title,
      category: req.body.category,
      userId: req.user._id,
      body: req.body.body,
      image: result.url
    };
    const post = await postService.createPost(body);
    return res.status(201).send({
      status: true,
      message: 'post created successfully',
      body: post
    });
  }

  async getPosts(req, res) {
    const post = await postService.getPosts();
    if (_.isEmpty(post)) {
      return res.status(200).send({ staus: true, message: 'no posts found' });
    }
    return res.status(200).send({
      status: true,
      body: post
    });
  }

  async postByTitle(req, res) {
    const post = await postService.findByTitle(req.params.title);

    if (!post) {
      return res.status(404).send({
        success: false,
        body: 'Could not find the requested post'
      });
    }

    return res.status(201).send({
      success: true,
      body: post
    });
  }

  async getPostByCategories(req, res) {
    const post = await postService.getPostByCategory(req.params.category);

    if (!post) {
      res.status(404).send({
        status: false,
        message: 'category does not exist'
      });
    }

    res.status(200).send({
      status: true,
      body: post
    });
  }

  async getUserById(req, res) {
    const post = await postService.getPostById(req.params.id);
    if (_.isEmpty(post)) {
      return res.status(200).send({
        success: true,
        message: 'No user with this id exits'
      });
    }
    return res.status(200).send({
      success: true,
      data: post
    });
  }

  async deletePost(req, res) {
    const post = await postService.findAndDeletePostById(req.params.id);
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

  async updateArticle(req, res) {
    const data = { id: req.params.postid, newData: req.body };
    const updatedArticle = await postService.updatePost(data.id, data.newData);
    return res.status(200).send({
      status: true,
      message: 'Successfully updated the selected collection',
      body: {
        data: { updatedArticle },
        createdAt: updatedArticle.createdAt,
        updatedAt: updatedArticle.updatedAt
      }
    });
  }

  async fetchAllUserPosts(req, res) {
    const userPosts = await postService.getUserPostById(req.params.id);
    if (_.isEmpty(userPosts)) {
      return res.status(404).send({
        status: true,
        message: 'this user has no posts'
      });
    }
    return res.status(200).send({
      status: true,
      body: userPosts
    });
  }

  async fetchPostById(req, res) {
    const posts = await postService.getPostById(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({
        status: false,
        body: 'no post found'
      });
    }
    return res.status(200).send({
      status: true,
      body: posts
    });
  }
}
export default new PostController();
