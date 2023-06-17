import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';
import '../config.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }
  //TODO Currently one user may have only one Toket, it's need execute!
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    // user exist
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    // User login in first time
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    console.log(`11111111111111111111111user data = ${tokenData}`);
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
