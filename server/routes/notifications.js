import express from 'express'
import notificationsController from '../controllers/notifications_controller'
import authValidations from '../middlewares/auth_middleware';

const routes = express.Router()

routes
  .get('/notifications', authValidations.checkUserToken, notificationsController.viewNotifications)
  .get('/notifications/count', authValidations.checkUserToken, notificationsController.countNotifications)
export default routes;