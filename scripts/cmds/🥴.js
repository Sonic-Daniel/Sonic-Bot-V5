module.exports = {
    config: {
        name: "🥴",
        version: "1.0",
        author: "ʬɸʬ Sønïč Shïsûį ʬɸʬ",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "🥴") return message.reply("𝙅'𝙩𝙚 𝙥𝙧𝙤𝙢𝙚𝙩𝙨 𝙙𝙚 𝙩'𝙖𝙧𝙧𝙖𝙘𝙝𝙚𝙧 𝙡𝙚 𝙘𝙚𝙧𝙫𝙚𝙖𝙪 🥴");
    }
}
