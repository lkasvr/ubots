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
      teamId: Joi.number(),
    },
  }),
  assistantController.create,
);

assistantsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  assistantController.show,
);

assistantsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
  }),
  assistantController.delete,
);

export default assistantsRouter;
