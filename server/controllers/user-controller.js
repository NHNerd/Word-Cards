import userService from '../service/user-service.js';

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
    } catch (e) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }
  //? test
  async getUsers(req, res, next) {
    try {
      res.status(200).json(['123', '213231312']);
    } catch (e) {}
  }
}

export default new UserController();
