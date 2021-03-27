import ytdl from "ytdl-core";
import pathFfmpeg from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { Response } from "express";

export default {
  async musicStream(videoId: string, cb: Response) {
    try {
      if (!!videoId) {
        const info = await ytdl.getBasicInfo(
          `http://www.youtube.com/watch?v=${videoId}`
        );
        if (!!info) {
          const stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`, {
            highWaterMark: 128,
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
            .on("stderr", console.log)
            .on("end", () => {
              console.log("end");
            })
            .pipe(cb, { end: true });
          //    .save(path.resolve(__dirname,'..','..','downloads',`${videoId}.mp3`));
        }
      }
    } catch (error: any) {
      return cb.status(400).json(error);
    }
  },
};
