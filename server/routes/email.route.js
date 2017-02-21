import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import emailCtrl from '../controllers/email.controller';

const router = express.Router();// eslint-disable-line new-cap

router.route('/test')
  .post(validate(paramValidation.testEmail), emailCtrl.testEmail);

export default router;
