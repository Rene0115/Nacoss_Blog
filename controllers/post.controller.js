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
  async createPost(req, res, next) {
    const { _id, isPublished } = req.body;

    const data = req.body;
    data.userId = req.userData._id;

    // || req.file?.originalname;
    const updateData = _.omit(data, '_id');

    // file upload only happens when the post ready to be published
    // let post;

    if (!_id) {
      // if no post id exists create post(draft) with id
      const post = await postService.createPost(updateData);
      return res.status(201).send({ status: true, message: 'post created successfully', body: post });
    }
    if (_id && !isPublished) {
      // if post exists and isPublished status is set to false update post(draft)
      const post = await postService.updatePost(_id, _.omit(updateData, 'isPublished'));
      return res.status(201).send({ status: true, message: 'post updated successfully', body: post });
    } if (_id && isPublished) {
      // post exists and isPublished status is set to true update post(draft)
      await postvalidator.validateAsync(updateData);
      // console.log(validated);
      // upload post image to cloudinary
      if (!('file' in req)) {
        return res.status(404).send({
          success: false,
          message: 'no file found, please attached a file'
        });
      }

      const response = await cloudinary.uploadImage(req.file.path);

      await postService.deleteFile(req.file);

      updateData.image = response.url;
      const posts = await postService.updatePost(_id, updateData);
      return res.status(201).send({ status: true, message: 'post published successfully', body: posts });
    }
    throw new Error('Unable to create draft');
  }

  async getPosts(req, res) {
    const post = await postService.getPost();
    if (_.isEmpty(post)) {
      return res.status(200).send({ staus: true, message: 'no posts found' });
    }
    return res.status(200).send({
      status: true,
      body: post
    });
  }

  async articleByTitle(req, res) {
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

  async fetchUserArticle(id) {
    const userArticle = await postService.getUserPostById(id);
    return userArticle;
  }

  async fetchAllUserPosts(req, res) {
    const userPosts = await postService.getUserPostById(req.params.id);
    if (_.isEmpty(userPosts)) {
      return res
        .status(404)
        .send({ status: true, message: 'this user has no posts' });
    }
    return res.status(200).send({ status: true, body: userPosts });
  }

  async fetchPostById(req, res) {
    const posts = await postService.getPostById(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({ status: false, body: 'no post found' });
    }
    if (req.userData === undefined || req.userData !== req.posts.userId) {
      const update = await postService.updatePost(req.params.id, { views: posts.views + 1 });
    }
    return res.status(200).send({ status: true, body: posts });
  }
}
export default new PostController();
