import { Router } from 'express';
// Controller
import RequestsController from '../controllers/RequestsController';
// Validation
import { celebrate, Joi, Segments } from 'celebrate';

const requestsRouter = Router();
const requestController = new RequestsController();

const validSubjects = ['Problemas com cartão', 'Contratação de Empréstimos', 'Outros Assuntos'];

requestsRouter.get('/', requestController.index);

requestsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().valid(...validSubjects).required(),
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
