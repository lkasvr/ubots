import { Router } from 'express';
// Controller
import TeamController from '../controllers/TeamController';
// Validation
import { celebrate, Joi, Segments } from 'celebrate';

const teamsRouter = Router();
const teamController = new TeamController();

teamsRouter.get('/', teamController.index);

teamsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    },
  }),
  teamController.create,
);

export default teamsRouter;
