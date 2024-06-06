module.exports = {
    config: {
        name: "ok",
        version: "1.0",
        author: "ʬɸʬ Shïsûį Dånïęl ʬɸʬ",
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
        if (event.body && event.body.toLowerCase() == "ok") return message.reply("𝐽'𝑑𝑜𝑖𝑠 𝑎𝑣𝑜𝑢𝑒𝑟😶🍁✨🎀𝑞𝑢𝑒 ʬɸʬ 𝑆ℎ𝑖𝑠𝑢𝑖 𝐷𝑎𝑛𝑖𝑒𝑙 ʬɸʬ 𝑒𝑠𝑡 𝑙𝑒 𝑝𝑙𝑢𝑠 𝑟𝑎𝑝𝑖𝑑𝑒 𝑑𝑢 𝑚𝑜𝑛𝑑𝑒😇🌿✨🎀");
    }
}
