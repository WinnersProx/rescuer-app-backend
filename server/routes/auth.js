import express from 'express'
import authController from '../controllers/auth_controller'
import authValidations from '../middlewares/auth_middleware';
const routes = express.Router()

routes
  .post('/auth/signup', authValidations.validateUser, authValidations.exists, authController.signup)
  .post('/auth/signin', authValidations.validateSignin, authController.signin)
  .patch('/auth/:user_id/role', authValidations.checkUserToken, authValidations.isSuperAdmin, authValidations.validateRole, authController.alterRole)
  .get('/auth/profile/:user_id', authValidations.checkUserToken, authValidations.ValidateUserId, authController.viewUserProfile)
  .patch('/auth/profile', authValidations.checkUserToken, authValidations.validateProfileUpdate, authController.updateProfile)
  .get('/auth/users', authValidations.checkUserToken, authController.viewUsers)
export default routes;
