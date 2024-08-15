const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt","time"],
    version: "1.0",
    author: "OtinXSandip",
    role: 2,
    shortDescription: {
      en: "stats",
    },
    longDescription: {
      en: "shows stats of bot.",
    },
    category: "system",
    guide: {
      en: "Use {p}stats to see stats of bot.",
    },
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
     const days = 
Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${days}days ${hours}hrs ${minutes}min ${seconds}sec`;

      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: "🕘🎶𝐃𝐔𝐑𝐄𝐄 𝐃𝐔 𝐂𝐎𝐌𝐁𝐀𝐓🎶🕘",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "𝐒𝐀𝐔𝐕𝐄𝐑 𝐊𝐎𝐍𝐎𝐇𝐀 !🎧🎶";
      if (ping < 400) {
        pingStatus = "𝐏𝐑𝐎𝐓𝐄𝐆𝐄𝐑 𝐊𝐎𝐍𝐎𝐇𝐀 !🎧🎵";
      }

      // Assuming global.utils.getStreamFromURL(img) is correctly defined
      const imgURL= "http://g-v1.onrender.com/gOkDwvKGg.gif";
      const attachment = await global.utils.getStreamFromURL(imgURL); api.sendMessage({
        body: `♣♦𝙐𝘾𝙃𝙄𝙒𝘼🎧𝘾𝙇𝘼𝙉♦♣\n━━━━━━━━━━━━━━━━
🎯 | 𝐒𝐇𝐈𝐒𝐔𝐈 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 𝐓𝐈𝐌𝐄﹞\n━━━━━━━━━━━━━━━━\n 🔵${uptimeString}🔵\n━━━━━━━━━━━━━━━━
📅 | 𝗗𝗔𝗧𝗘﹞: ${date}\n━━━━━━━━━━━━━━━━\n   𝗧𝗲𝗺𝗽: ${time}\n━━━━━━━━━━━━━━━━
🏂 | 𝐓𝐨𝐭𝐚𝐥 𝐯𝐢𝐜𝐭𝐢𝐦𝐞𝐬: ${allUsers.length}\n━━━━━━━━━━━━━━━━
🏢 | 𝘛𝘰𝘵𝘢𝘭 𝘛𝘩𝘳𝘦𝘢𝘥𝘴﹞: ${allThreads.length}\n━━━━━━━━━━━━━━━━\n 🎶| Frequence: ${ping}Hz\n━━━━━━━━━━━━━━━━\n status: ${pingStatus}`,
        attachment: attachment,
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
}
