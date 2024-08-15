 module.exports = {
    config: {
        name: "salut",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "salut") return message.reply("𝐒𝐚𝐥𝐮𝐭 𝐯𝐢𝐞𝐮𝐱 👷✨👋 𝐪𝐮'𝐞𝐬𝐭 𝐜'𝐪𝐮𝐞 𝐭𝐮 𝐟𝐚𝐢𝐬 𝐝𝐚𝐧𝐬 𝐥'𝐜𝐨𝐢𝐧 !?⏳🎶🎧");
}
};
