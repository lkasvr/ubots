import { Router } from 'express';
// Controller
import ClientController from '../controllers/ClientController';
// Validation
import { celebrate, Joi, Segments } from 'celebrate';

const clientsRouter = Router();
const clientController = new ClientController();

clientsRouter.get('/', clientController.index);

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      requestsIds: Joi.array().max(3).items(Joi.object({ id: Joi.number().required() })),
    },
  }),
  clientController.create,
);

clientsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
  }),
  clientController.delete,
);

export default clientsRouter;
