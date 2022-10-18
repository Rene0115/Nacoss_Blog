/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import userModel from '../models/user.model.js';

class UserService {
  async create(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async findByEmail(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }

  async getUserById(id) {
    const user = await userModel.findOne({ _id: id });
    return user;
  }

  async fetchUserDetails(id) {
    const user = await userModel.findOne({ _id: id });
    return user;
  }
  async updateUserImage(id, data) {
    const user = await userModel.updateOne({ _id: id }, data, { runValidators: true });
    return user;
  }
  async findOne(filter = {}) {
    const user = await userModel.findOne(filter);
    return user;
  }
  async getVerified() {
    const verifiedUser = await userModel.find({ verified: true });
    return verifiedUser;
  }
}

export default new UserService();
