import {Router} from 'express';
import {youtubeController} from './controllers'
const routes = Router();

routes.get('/list-downloads',youtubeController.downloadMusic);
routes.get('/music-stream/:id',youtubeController.musicStream);
export default routes;