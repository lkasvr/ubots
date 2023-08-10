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
      desc: Joi.string().required(),
      clientId: Joi.string().uuid().required(),
    },
  }),
  requestController.create,
);

requestsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestController.show,
);

requestsRouter.get(
  '/status/:status',
  celebrate({
    [Segments.PARAMS]: {
      status: Joi.string().valid('PENDENTE', 'ADERIDA', 'CONCLUIDA').required(),
    },
  }),
  requestController.showByStatus,
);

requestsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      requestId: Joi.string().uuid().required(),
      assistantId: Joi.string().uuid(),
      status: Joi.string().valid('PENDENTE', 'CONCLUIDA'),
    },
  }),
  requestController.update,
);

requestsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  requestController.delete
);

export default requestsRouter;
