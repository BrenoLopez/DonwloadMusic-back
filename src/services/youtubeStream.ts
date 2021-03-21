import YtSearch from "yt-search";
import path from "path";
import ytdl from "ytdl-core";
import pathFfmpeg from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

export default {
  async musicStream(videoId: string, cb: any) {
    try {
      if (!!videoId) {
        const info = await ytdl.getBasicInfo(
          `http://www.youtube.com/watch?v=${videoId}`
        );

        const stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`, {
          highWaterMark: 2,
          quality: "highestaudio",
        });

        cb.writeHead(200, {
          "Transfer-Encoding": "chunked",
          "Content-Type": "audio/mp3",
          // "Content-Length": Infinity,
        });
        ffmpeg(stream)
          .setFfmpegPath(pathFfmpeg)
          .audioBitrate("128k")
          .toFormat("mp3")
          .on("error", (error) => {
            console.log(error);
          })
          .on('stderr',console.log)
          .on("end", () => {
            console.log("end");
          })
          .pipe(cb, { end: true });
        //    .save(path.resolve(__dirname,'..','..','downloads',`${videoId}.mp3`));
      }
    } catch (error) {
      throw new Error("[Search video]" + error);
    }
  },
};
