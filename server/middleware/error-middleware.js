import ApiError from '../exceptions/api-error.js';
//TODO Now I dont get correct error response
export default function errorMid(err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Occuer dont waite error' });
}
