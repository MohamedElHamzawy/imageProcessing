import express from 'express';
import resizeImage from './image.controller';
import middlewares from '../middleware/middleware';

const router = express.Router();
router.get(
  '/resize',
  middlewares.queryValidation,
  middlewares.existValidation,
  resizeImage
);
export default router;
