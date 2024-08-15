module.exports = {
    config: {
        name: "ai",
        version: "1.0",
        author: "ʬʆʬ Sønïč Shïsûį ʬɸʬ", // this cmd will expire if will change the credits
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
  const link = [
"https://i.ibb.co/xjN5mq3/image.jpg",
"https://i.ibb.co/PTDc8Wm/image.jpg",
"https://i.ibb.co/HnSN01C/image.jpg"
]
 let img = link[Math.floor(Math.random()*link.length)]
    if (event.body && event.body.toLowerCase() == "ai") return message.send({
  body: "🙍| Ta gueule on dit Shisui....pas ai🚫",attachment: await global.utils.getStreamFromURL(img)})
}
};
