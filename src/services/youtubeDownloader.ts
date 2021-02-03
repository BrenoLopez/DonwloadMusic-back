import YouTubePlaylist from 'yt-dl-playlist';

class Downloader extends YouTubePlaylist{    
    constructor(data:{ 
        outputPath: string,
        ffmpegPath: string,
        maxParallelDownload: number}){
        super(data);
    }
    
}
export default Downloader;