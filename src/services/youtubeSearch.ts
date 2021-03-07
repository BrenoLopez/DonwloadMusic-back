import YtSearch from "yt-search";
import { youtubeDownloader as YouTubePlaylist } from "../services";
import path from "path";
import ytdl from "ytdl-core";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import Stream from "stream";

export default {
  async searchVideo(videoName: string, type: string) {
    try {
      let list = <
        YtSearch.VideoSearchResult | YtSearch.PlaylistSearchResult | any
      >[];
      if (!!videoName) {
        switch (type) {
          case "video":
            list = (await YtSearch(videoName)).videos;
            list = list.map((item: YtSearch.VideoSearchResult) => ({
              title: item.title,
              videoId: item.videoId,
              image: item.image,
              timestamp: item.timestamp,
              author: item.author.name,
            }));
            break;
          case "playlist":
            list = (await YtSearch(videoName)).playlists;
            list = list.map((item: YtSearch.PlaylistSearchResult) => ({
              title: item.title,
              listId: item.listId,
              image: item.image,
              videoCount: item.videoCount,
              author: item.author.name,
            }));
            break;
        }
        const videoStream = ytdl(
          `http://www.youtube.com/watch?v=${list[0].videoId}`,
          {
            quality: "highestaudio",
          }
        ).pipe(fs.createWriteStream("video.mp4"));
     
        const command = ffmpeg(fs.createReadStream("video.mp4"), {
          stdoutLines: 0,
        })
          .format("mp3")
          .output("video.mp3")
          .on("end", () => {
            console.log("end");
          })
          .on("error", (err) => {
            console.log(err);
          });
        process.nextTick(() => {
          command.run();
        });
        // const downloader = new YouTubePlaylist({
        //   outputPath: path.resolve(__dirname, "..", "..", "downloads"),
        //   ffmpegPath: path.resolve(
        //     __dirname,
        //     "..",
        //     "ffmpeg",
        //     "bin",
        //     "ffmpeg.exe"
        //   ),
        //   maxParallelDownload: 1,
        // });

        // const download = await downloader.download(
        //   `${list[0].videoId}`,
        //   `${list[0].videoId}.mp3`
        // );

        // if (!download) throw new Error("Falha no download!");

        return list;
      }
    } catch (error) {
      throw new Error("[Search video]" + error);
    }
  },
};
