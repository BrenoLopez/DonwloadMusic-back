import YtSearch from "yt-search";

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

        return list;
      }
    } catch (error) {
      throw new Error("[Search video]" + error);
    }
  },
};
