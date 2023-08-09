import { Router } from 'express';

import clientsRouter from '@modules/client/infra/http/routes/client.routes';
import assistantsRouter from '@modules/assistant/infra/http/routes/assistant.routes';
import teamsRouter from '@modules/team/infra/http/routes/team.routes';
import requestsRouter from '@modules/request/infra/http/routes/request.route';

const routes = Router();

routes.use('/clients', clientsRouter);
routes.use('/teams', teamsRouter);
routes.use('/assistants', assistantsRouter);
routes.use('/requests', requestsRouter);

export default routes;
