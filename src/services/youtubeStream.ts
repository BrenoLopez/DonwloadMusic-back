import ytdl from "ytdl-core";
import pathFfmpeg from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { Response } from "express";

export default {
  async musicStream(videoId: string, cb: Response) {
    try {
      if (!!videoId) {
        const validateVideoId = ytdl.validateURL(
          `http://www.youtube.com/watch?v=${videoId}`
        );
        // const info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${videoId}`);
        // console.log(info);
        if (!!validateVideoId) {
          let streamSize = 0;
          const stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`, {
            highWaterMark: 32,
            quality: "highestaudio",
          });
          cb.writeHead(200, {
            Connection: "Keep-Alive",
            "Accept-Ranges": "bytes",
            "Transfer-Encoding": "chunked",
            "Content-Type": "audio/mp3",
          });
          ffmpeg(stream)
            .setFfmpegPath(pathFfmpeg)
            .audioBitrate("128k")
            .toFormat("mp3")
            .on("error", (error) => {
              // cb.destroy(error);
              console.log(error);
            })
            .on("stderr", console.log)
            .on("progress", console.log)
            .on("end", () => {
              console.log("end");
            })
            .pipe(cb, { end: true });
          //    .save(path.resolve(__dirname,'..','..','downloads',`${videoId}.mp3`));
        } else return cb.status(400).json({ error: "Invalid videoId!" });
      }
    } catch (error: any) {
      return cb.status(400).json(error);
    }
  },
};
