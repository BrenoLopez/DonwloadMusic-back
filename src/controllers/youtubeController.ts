import {Request,Response,NextFunction} from 'express';
import pathFfmpeg from 'ffmpeg-static';
import fs from 'fs';
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import path from 'path';
import {youtubeSearch,youtubeStream} from '../services';

export default {
    async downloadMusic(request:Request,response:Response){
        if(!request.query.music)
        response.json({msg: 'Faltou informar o nome da música !'});
        const music = request.query.music as string;
        const type = request.query.type as string;
        const returnSearchVideo = await youtubeSearch.searchVideo(music,type);

    return response.json(returnSearchVideo);
    },
    async musicStream(request:Request,response:Response){
        const {id} = request.params;
        youtubeStream.musicStream(id,response);
    }
}