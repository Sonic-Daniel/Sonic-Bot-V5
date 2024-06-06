module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: " ❥ʚ𝑬𝑷𝑯𝑬𝑵𝑰𝑨๖ۣ•҉ 𝐓𝐨𝐩 100 𝐑𝐢𝐜𝐡 𝐔𝐬𝐞𝐫𝐬"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 100);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);
 
 const messageText = ` ❥𝐒𝐎𝐍𝐈𝐂🍀 𝐓𝐎𝐏 𝐑𝐈𝐂𝐇𝐄𝐒𝐓 🎁💰\n━━━━━━━━━━━━\n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};
