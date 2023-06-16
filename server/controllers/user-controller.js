import userService from '../service/user-service.js';
import '../config.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await userService.registration(email, password); //! Issue

      // Refresh token save in cookie
      res.cookie('refrehToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //TODO if use HTTPS need add flag - sequre
        httpOnly: true, //? httpOnly not be change in browser
      });

      return res.status(201).json(userData);
    } catch (e) {
      return res.status(500).json(`${e}`);
    }
  }

  async login(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        test: 'complite!!!',
      });
    } catch (e) {}
  }
  async logout(req, res, next) {
    try {
    } catch (e) {}
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activate(activationLink);
      console.log('User is activate!');
      return res.redirect(process.env.CLIENT_URL); //? Swithc on client
    } catch (e) {
      console.log(e);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }
  //? test
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (e) {
      console.error('Error try to get users:', e);
      res.status(500).json({ e: 'Server error' });
    }
  }
  async removeAllUsers(req, res, next) {
    try {
      const { email } = req.body;
      await userService.deleteAllUsers(email);
      res.status(200).json({ message: `user with email: ${email} is deleted.` });
    } catch (e) {
      console.error('Error try to remove:', e);
      res.status(500).json({ e: `${e}` });
    }
  }
}

export default new UserController();
