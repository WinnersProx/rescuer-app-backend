import express from 'express'
import alertsController from '../controllers/alerts_controller'
import authValidations from '../middlewares/auth_middleware';
import alertsValidations from '../middlewares/alerts_middleware';
const routes = express.Router()

routes
  .post('/alerts', authValidations.checkUserToken, alertsValidations.validateAlert, alertsController.triggerAlert)
  .get('/alerts', authValidations.checkUserToken, authValidations.isAdminOrSuper, alertsController.viewAlerts)
  .patch('/alerts/:alert_id/acknowledge', authValidations.checkUserToken, alertsValidations.isValid, authValidations.isAdminOrSuper, alertsController.acknowledge)
  .patch('/alerts/:alert_id/disapprove', authValidations.checkUserToken, alertsValidations.isValid, authValidations.isAdminOrSuper, alertsController.disapprove)
export default routes;
