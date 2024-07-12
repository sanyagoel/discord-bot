const Parser = require("rss-parser");

const notif = require("../../models/notif-config");

module.exports = async ( c, client, handler ) => {

goYoutube();
setInterval(goYoutube,60_000);


 async function goYoutube(){
        try{
            const notifChannels = await notif.find();

            notifChannels.forEach(async (notif) => {
              const server = await c.guilds.fetch(notif.guildID);
              if (!server) {
                await notif.deleteOne({
                  guildID: notif.guildID,
                  channelID: notif.channelID,
                });
                return;
              }
              const channel = await server.channels.fetch(notif.channelID);
              if (!channel) {
                await notif.deleteOne({
                  guildID: notif.guildID,
                  channelID: notif.channelID,
                });
                return;
              }
          
              const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${notif.youtubeChannelID}`;
              const parser = new Parser();
          
              const feed = await parser.parseURL(YOUTUBE_RSS_URL);
              if (!feed.items.length || !feed) {
                return;
              }
          
              const latestVideo = feed.items[0];
              if (
                notif.lastCheckedVideo == null ||
                (notif.lastCheckedVideo.id !== latestVideo.id.split(":")[2] &&
                  new Date(notif.lastCheckedVideo.publishdate) <
                    new Date(latestVideo.pubDate))
              ) {
                notif.lastCheckedVideo = {
                    id : latestVideo.id.split(":")[2],
                    publishdate  : latestVideo.pubDate
                }
                // notif.lastCheckedVideo.id = latestVideo.id.split(":")[2];
                // notif.lastCheckedVideo.publishdate = latestVideo.pubDate;
                const result2 = await notif.save();
                //{VIDEO_LINK}  , {VIDEO_NAME} , {YOUTUBE_CHANNEL} , {CHANNEL_URL}
                if (result2) {
                  const targetMessage =
                    notif.customMsg
                      ?.replace("VIDEO_LINK", latestVideo.link)
                      ?.replace("VIDEO_NAME", latestVideo.title)
                      ?.replace("YOUTUBE_CHANNEL", feed.title)
                      ?.replace("CHANNEL_URL", feed.link) || `New Video By ${feed.title} just dropped!. \n check his latest video - ${latestVideo.link}`;
                      channel.send(targetMessage);
                      console.log(targetMessage);
                      return;
                }else{
                    console.log('No New video to post');
                }
              }
            
            });
          
        }catch(err){
            console.log(err);
        }
    }

};
