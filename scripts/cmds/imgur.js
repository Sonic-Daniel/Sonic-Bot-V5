const axios = require("axios");

module.exports.config = {
  name: "imgur",
  version: "6.9",
  author: "GoatMart",
  countDown: 5,
  role: 0,
  category: "utility",
  description: "convert image/video/gifs/audio etc. into Imgur link",
  usages: "reply [image, video, audio, gifs]",
  category: "tools",
};

module.exports.onStart = async function ({ api, event }) {
  const url = event.messageReply?.attachments[0]?.url;
  if (!url) {
    return api.sendMessage(
      "Please reply to an image, video, audio, gif etc.",
      event.threadID,
      event.messageID,
    );
  }
  
  try {
    const baseApiUrl = 'https://g-v1.onrender.com';
    
    const uploadResponse = await axios.post(`${baseApiUrl}/v1/upload`, null, {
      params: { url: url },
    });

    if (uploadResponse.status !== 200 || !uploadResponse.data.link) {
      throw new Error('Failed to upload image.');
    }

    const shortLink = uploadResponse.data.link;
    
    return api.sendMessage(shortLink, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    return api.sendMessage(
      "Failed to convert image or video into link.",
      event.threadID,
      event.messageID,
    );
  }
};
