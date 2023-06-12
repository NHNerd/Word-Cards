class UserController {
  async registration(req, res, next) {
    try {
    } catch (e) {}
  }
  async login(req, res, next) {
    try {
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
