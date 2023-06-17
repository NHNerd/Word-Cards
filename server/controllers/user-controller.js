import userService from '../service/user-service.js';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import '../config.js';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error validation', errors.array()));
      }

      const { email, password } = req.body;

      const userData = await userService.registration(email, password); //! Issue

      // Refresh token save in cookie
      resCookieRfresh(res, userData);

      return res.status(201).json({ message: 'Registration is successfully', userData });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error validation', errors.array()));
      }

      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      // Refresh token save in cookie
      resCookieRfresh(res, userData);

      return res.status(200).json({ message: 'Logged is successfully', userData });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie(refreshToken);
      return res.status(200).json({ massge: `Logout is comlite. Token: ${token} is deleted.` });
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activate(activationLink);
      console.log('User is activate!');
      return res.status(201).redirect(process.env.CLIENT_URL); //? Swithc on client
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      // Refresh token save in cookie
      resCookieRfresh(res, userData);

      return res.status(201).json({ message: 'Refresh is successfuly', userData });
    } catch (e) {
      next(e);
    }
  }
  //? test
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  async removeAllUsers(req, res, next) {
    try {
      const { email } = req.body;
      await userService.deleteAllUsers(email);
      res.status(200).json({ message: `user with email: ${email} is deleted.` });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

function resCookieRfresh(res, userData) {
  // Refresh token save in cookie
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //TODO if use HTTPS need add flag - sequre
    httpOnly: true, //? httpOnly not be change in browser
  });
}
