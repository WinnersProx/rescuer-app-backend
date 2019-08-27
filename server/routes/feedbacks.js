import express from 'express'
import feedbacksController from '../controllers/feedbacks_controller'
import authValidations from '../middlewares/auth_middleware';
import feedbacksValidations from '../middlewares/feedbacks_middleware';

const routes = express.Router()

routes
  .post('/feedbacks', authValidations.checkUserToken, feedbacksValidations.validateFeedback, feedbacksController.newFeedback)
  .get('/feedbacks', authValidations.checkUserToken, feedbacksController.viewFeedbacks)

export default routes;