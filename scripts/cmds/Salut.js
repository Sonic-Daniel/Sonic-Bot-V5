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
    if (event.body && event.body.toLowerCase() == "salut") return message.reply("𝑆𝑎𝑙𝑢𝑡 ✋✨🍀...𝑐𝑎 𝑡𝑒 𝑑𝑖𝑡 𝑢𝑛𝑒 𝑝'𝑡𝑖𝑡𝑒 𝑐𝑜𝑢𝑟𝑠𝑒...𝑐𝑜𝑛𝑡𝑟𝑒 𝑚𝑜𝑖 !?😏✨🌿✅");
}
};
