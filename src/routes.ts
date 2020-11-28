import { Router } from 'express';
import HelpController from './controllers/HelpController';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    welcome_message: 'Stay Safe REST API: https://estacao-hack-2020.github.io/stay-safe'
  })
})

routes.get('/help', HelpController.index);
routes.get('/help/:id', HelpController.show);
routes.post('/help', HelpController.create);
routes.delete('/help/:id', HelpController.delete);
routes.put('/help/:id', HelpController.update);
routes.patch('/help/:id', HelpController.changeStatus);

export default routes;