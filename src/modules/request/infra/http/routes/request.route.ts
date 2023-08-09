import { Router } from 'express';
// Controller
import RequestsController from '../controllers/RequestsController';
// Validation
import { celebrate, Joi, Segments } from 'celebrate';

const requestsRouter = Router();
const requestController = new RequestsController();

requestsRouter.get('/', requestController.index);

requestsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      clientId: Joi.number().required(),
    },
  }),
  requestController.create,
);

requestsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  requestController.show,
);

requestsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      requestId: Joi.number().required(),
      assistantId: Joi.number(),
      status: Joi.string(),
    },
  }),
  requestController.update,
);

requestsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  requestController.delete
);

export default requestsRouter;
