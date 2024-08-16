module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "ʭɸʭ Sønïč Shïsûį ʭɸʭ",// don't change this credit
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "system",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `🎯𝐏𝐑𝐄𝐅𝐈𝐗👻𝐒𝐇𝐈𝐒𝐔𝐈🎯:↠%1↞\n━━━━━━━━━━━━━━━━\n🖤𝐔𝐂𝐇𝐈𝐖𝐀👽𝐒𝐘𝐒𝐓𝐄𝐌🖤:⇨%2⇦\n━━━━━━━━━━━━━━━━\n🏁☘𝑀𝑌 𝐶𝑅𝐸𝐴𝑇𝑂𝑅☘🏁\n━━━━━━━━━━━━━━━━\n🥷ʬɸʬ Sønïč❤‍🔥Shïsûį ʬɸʬ🥷\n━━━━━━━━━━━━━━━━\n👷✨𝗧𝗮𝗽𝗲 %1𝗵𝗲𝗹𝗽 𝗽𝗼𝘂𝗿 𝗮𝘃𝗼𝗶𝗿 𝗹𝗮 𝗹𝗶𝘀𝘁𝗲 𝗱𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀✨👷`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/By078j8/image.gif")
 });
 }
 }
}
