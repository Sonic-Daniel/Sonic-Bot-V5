 const axios = require('axios');

const Prefixes = [
  'sonic'
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "Shïsûį",
    longDescription: "AI", 
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("𝐏𝐨𝐬𝐞 𝐦𝐨𝐢 𝐭𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 ✅✨🌿 𝐣𝐞 𝐥𝐚 𝐫𝐞𝐬𝐨𝐥𝐯𝐞 𝐚 𝐥𝐚 𝐯𝐢𝐭𝐞𝐬𝐬𝐞 𝐝𝐞 𝐥'𝐞𝐜𝐥𝐚𝐢𝐫🏂✨🍀");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `𝐒𝐎𝐍𝐈𝐂 🍀
✧════•❁❀❁•════✧        ${answer}
✧════•❁❀❁•════✧ 𝐒𝐔𝐏𝐄𝐑 𝐒𝐎𝐍𝐈𝐂🏂`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
  }
