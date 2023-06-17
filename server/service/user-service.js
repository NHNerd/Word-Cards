import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserModel from '../models/user-model.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';
import '../config.js';

class UserService {
  async registration(email, password) {
    // Search email in DB
    const candidate = await UserModel.findOne({ email });
    // Check email exist
    if (candidate) {
      throw ApiError.BadRequest(`User with this email ${email} already exist!`);
    }
    // Hashing password
    const hashPassword = await bcrypt.hash(password, 3);
    // Random generate link
    const activationLink = uuidv4();

    // Create new user
    const user = await UserModel.create({ email, password: hashPassword, activationLink });

    //send activation link on user mail
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    // DTO for response
    const userDto = new UserDto(user); // id, email, isActivated
    // Create token
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(`Link is not correct!`);
    }
    if (user.isActivated) {
      return console.log('User already is activated');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with this email ${email} is does not found :(`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Password is not correct!`);
    }
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getUsers() {
    const users = await UserModel.find({});
    return users;
  }

  async deleteAllUsers(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(`User with this email ${email} does not exist!`);
    }
    await UserModel.deleteOne({ email });
  }
}

export default new UserService();
