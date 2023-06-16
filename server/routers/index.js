import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller.js';

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.login
);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.get('/users', userController.getUsers); //? Test for get list of users
router.delete('/users/remove', userController.removeAllUsers); //? Test for get list of users

export default router;
