import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
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

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne(refreshToken);
    return tokenData;
  }
}

export default new TokenService();
