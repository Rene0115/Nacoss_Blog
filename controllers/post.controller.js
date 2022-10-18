/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
// import cloudinary from 'cloudinary';
import _ from 'lodash';
import cloudinary from '../config/cloudinary.config.js';
import postService from '../services/post.services.js';
import postvalidator from '../validators/post.validator.js';
// import { deleteFile } from '../services/post.service'

class PostController {
  async createPost(req, res) {
    const data = {
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      userId: req.user._id
    };
    const post = await postService.createPost(data);
    if (!post) {
      return res.send('something went wrong');
    }
    return res.status(200).send({ data: post });
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
    const article = await postService.findByTitle(req.params.title);

    if (!article) {
      return res.status(404).send({
        success: false,
        body: 'Could not find the requested article'
      });
    }

    return res.status(201).send({
      success: true,
      body: article
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
