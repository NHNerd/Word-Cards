import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserModel from '../models/user-model.js';
import UserDto from '../dtos/user-dto.js';

class UserService {
  async registration(email, password) {
    // Search email in DB
    const candidate = await UserModel.findOne({ email });
    // Check email exist
    if (candidate) {
      throw new Error(`User with this email ${email} already exist!`);
    }
    // Hashing password
    const hashPassword = await bcrypt.hash(password, 3);
    // Random generate link
    const activationLink = uuidv4();

    // Create new user
    const user = await UserModel.create({ email, password: hashPassword, activationLink });

    //send activation link on user mail
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async getUsers() {
    const users = await UserModel.find({});
    return {
      users,
    };
  }
  async deleteAllUsers(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with this email ${email} dont exist!`);
    }
    await UserModel.deleteOne({ email });
  }
}

export default new UserService();