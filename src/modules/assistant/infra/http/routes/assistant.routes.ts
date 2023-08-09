import { Router } from 'express';
// Controller
import AssistantController from '../controllers/AssistantController';
// Validation
import { celebrate, Joi, Segments } from 'celebrate';

const assistantsRouter = Router();
const assistantController = new AssistantController();

assistantsRouter.get('/', assistantController.index);

assistantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      teamId: Joi.string().uuid(),
    },
  }),
  assistantController.create,
);

assistantsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assistantController.show,
);

assistantsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      assistantId: Joi.string().uuid().required(),
      name: Joi.string().required(),
    },
  }),
  assistantController.update,
);

assistantsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  assistantController.delete,
);

export default assistantsRouter;
