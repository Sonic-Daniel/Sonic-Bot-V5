module.exports = {
  config: {
    name: "dark",
    aliases: ["drk"],
    version: "1.0",
    author: "ʬɸʬ Shïsûį Dånïęl ʬɸʬ",
    countDown: 10,
    role: 0,
    shortDescription: "Amuses toi bien au jeu du hasard",
    longDescription: "Seul le hasard tu rendras riche ou pauvre...Bonne chance",
    category: "game",
    guide: "{pn} <Sonic/Shadow> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["sonic", "shadow"].includes(betType)) {
      return message.reply("🎁 | 𝘾𝙝𝙤𝙞𝙨𝙞𝙨 : '𝙨𝙤𝙣𝙞𝙘' 𝙤𝙪 '𝙨𝙝𝙖𝙙𝙤𝙬'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("🌿 | 𝐌𝐢𝐬𝐞 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 50$ 𝐨𝐮 𝐩𝐥𝐮𝐬.");
    }

    if (betAmount > userData.money) {
      return message.reply("💁 | 𝑽𝒂𝒔 𝒅𝒆𝒎𝒂𝒏𝒅𝒆𝒓 𝒖𝒏 𝒕𝒓𝒂𝒏𝒔𝒇𝒆𝒓𝒕 𝒂 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🌿🎀𝑺𝑶𝑵𝑰𝑪🍀🏂  ───────────\n<(*✨∀✨*)ﾉ\n🍀[ ${resultString} ]🍀\n🎁 | 𝐁𝐢𝐞𝐧 𝐣𝐨𝐮𝐞 𝐭'𝐚𝐬 𝐠𝐚𝐠𝐧𝐞 🎀${winAmount}€🎀!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🎀🌿𝑺𝑶𝑵𝑰𝑪🍀🏂  ───────────\n🖕🏻(#°□°)🖕🏻\n🍁[ ${resultString} ]🍁\n🤦🏼| 𝐓𝐮 𝐚𝐬 𝐩𝐞𝐫𝐝𝐮 🎀${betAmount}€🎀.`);
    }
  }
};
