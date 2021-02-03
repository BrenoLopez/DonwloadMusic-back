import YtSearch from 'yt-search';
// import {youtubeDownloader as YouTubePlaylist} from '../services';
// import path from 'path';

export default {
    async searchVideo(videoName: string,type:string){
       
        try{ 
            let list = <YtSearch.VideoSearchResult|YtSearch.PlaylistSearchResult|any>[];
           if(!!videoName){   
               switch (type){
                   case 'video':
                        list = (await YtSearch(videoName)).videos;
                        list = list.map((item:YtSearch.VideoSearchResult)=>({title: item.title,videoId:item.videoId,image:item.image,timestamp:item.timestamp,author:item.author.name}));
                        break;
                   case 'playlist':
                        list = (await YtSearch(videoName)).playlists;
                        list = list.map((item:YtSearch.PlaylistSearchResult)=>({title: item.title,listId:item.listId,image:item.image,videoCount:item.videoCount,author: item.author.name}));
                    break;

               }      
            // const downloader = new YouTubePlaylist({ 
            //     outputPath: path.resolve(__dirname, '..','..', 'downloads'),
            //     ffmpegPath:path.resolve(__dirname, '..', 'ffmpeg','bin','ffmpeg.exe'),
            //     maxParallelDownload: 1});
                
            //     const download = await downloader.download('yG_AQGPmUUA','yG_AQGPmUUA.mp3');  
                
            //     if(!download)
            //     throw new Error('Falha no download!'); 
                
           return list;
        }
        }
        catch(error){
            throw new Error('[Search video]'+error);
        }
    }
}