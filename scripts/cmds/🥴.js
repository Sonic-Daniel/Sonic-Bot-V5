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
        if (event.body && event.body.toLowerCase() == "🥴") return message.reply("𝑉𝑖𝑒𝑛𝑠....𝑜𝑛 𝑣𝑎𝑠 𝑝𝑟𝑒𝑛𝑑𝑟𝑒 𝑢𝑛 𝑏𝑜𝑛 𝑐𝑜𝑢𝑝 🥴🚬💨");
    }
}
