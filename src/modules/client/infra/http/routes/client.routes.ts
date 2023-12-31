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
      requestsIds: Joi.array().max(3).items(Joi.object({ id: Joi.string().uuid().required() })),
    },
  }),
  clientController.create,
);

clientsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),
  clientController.show,
);

clientsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.string().uuid().required(),
      name: Joi.string(),
      email: Joi.string().email()
    },
  }),
  clientController.update,
);

clientsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),
  clientController.delete,
);

export default clientsRouter;
