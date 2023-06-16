export default class ApiError extends Error {
  status;
  errors;
  //? = [] - its default
  constructor(status, message, errors = []) {
    super(message); //?
    this.status = status;
    this.status = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not  authorazed');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
//TODO Now I dont get correct error response
