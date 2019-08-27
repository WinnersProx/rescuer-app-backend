import express from 'express';
import authRouter from './auth';
import alertsRouter from './alerts';
import notificationsRouter from './notifications';
import feedbacksRouter from './feedbacks';
const router = express.Router();

router.use('/api/v1/', router);
router.use('/', authRouter);
router.use('/', alertsRouter);
router.use('/', notificationsRouter);
router.use('/', feedbacksRouter);

router.get('/', (req, res) => {
  res.status(200).send({message : `Welcome to Rescuer api feel home`})
});

export default router;
