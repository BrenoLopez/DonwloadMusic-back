import {Router} from 'express';
import {youtubeController} from './controllers'
const routes = Router();

routes.get('/list-downloads',youtubeController.downloadMusic);

export default routes;