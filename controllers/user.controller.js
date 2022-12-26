/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { transporter, mailGenerator } from '../config/mailer.config.js';
import userService from '../services/user.services.js';

dotenv.config();
class UserController {
  async create(req, res) {
    const user = await userService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    const newUser = await userService.create(data);

    const verificationToken = newUser.generateToken();
    const url = `${process.env.APP_URL}/users/verify/${verificationToken}`;

    const response = {
      body: {
        name: `${req.body.firstName} ${req.body.lastName}`,
        intro: 'Email Verification Link',
        action: {
          instructions:
              'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
          button: {
            text: 'Verify Email',
            link: url
          }
        },
        outro: 'Do not share this link with anyone.'
      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Nacoss-Blog <nacossblogapp@gmail.com>',
      to: req.body.email,
      subject: 'Verify Your Email',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Sent a verification email to ${req.body.email}`
    });
  }

  async loginUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        body: 'user does not exist'
      });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(400).send({
        success: false,
        message: 'email or password is invalid'
      });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async forgotPassword(req, res) {
    const { newPassword } = req.body;

    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist'
      });
    }
    if (user) {
      const hash = bcrypt.hashSync(newPassword, 10);

      await user.updateOne({ password: hash });
    }

    const response = {
      body: {
        name: `${user.username}`,
        intro: 'Password Reset Successfully.',
        outre: 'If you did not initiate this reset please contact our customer support.'

      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Across the Globe <enere0115@gmail.com>',
      to: user.email,
      subject: 'Password reset success',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Password changed successfully. Confirmation email sent to  ${user.email}`
    });
  }

  async updateUserPhoto(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const data = { photo: result.url };

    const update = await userService.updateUserImage(req.body.id, data);
    if (update.acknowledged === true) {
      return res.status(201).send({ status: true, message: 'image uploaded successfully' });
    }
    return res.status(200).send({ status: false, message: 'couldn\'t upload image...try again later!' });
  }

  async verify(req, res) {
    const { token } = req.params;

    if (!token) {
      return res.status(422).send({
        message: 'Missing Token'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );
    const user = await userService.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({
        message: 'User does not  exists'
      });
    }

    user.verified = true;
    await user.save();

    return res.status(200).send({
      message: 'Account Verified'
    });
  }

  async getVerifiedUser(req, res) {
    const users = await userService.getVerified();
    if (_.isEmpty(users)) {
      return res.status(200).send({
        success: true,
        message: 'No verified users found'
      });
    }
    return res.status(200).send({
      success: true,
      data: users
    });
  }
}

export default new UserController();
