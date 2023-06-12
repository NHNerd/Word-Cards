import bcrypt from 'bcrypt';
import uuid from 'uuid';

import mailService from './mail-service.js';
import UserModel from '../models/user-model.js';

class UserService {
  async registration(email, password) {
    // Search email in DB
    const candidate = await UserModel.findOne({ email });
    // Check email exist
    if (candidate) {
      throw new Error(`User with this email ${email} already exist!`);
    }
    // Hashing password
    const hashPassword = await bcrypt.hash(password, salt);
    // Random generate link
    const activationLink = uuid.v4();
    // Create new user
    const user = await new UserModel.create({ email, password: hashPassword, activationLink });
    //send activation link on user mail
    await mailService.sendActiovationMail(email, activationLink);
  }
}

export default new UserService();
