import {Request,Response} from 'express';
import {youtubeSearch} from '../services';
export default {
    async downloadMusic(request:Request,response:Response){
        if(!request.query.music)
        response.json({msg: 'Faltou informar o nome da música !'});
        const music = request.query.music as string;
        const type = request.query.type as string;
        const returnSearchVideo = await youtubeSearch.searchVideo(music,type);

    return response.json(returnSearchVideo);
    }
}