const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "banque",
    version: "1.2",
    description: "Deposit or withdraw money from the bank and earn interest",
    guide: {
      vi: "",
      en: "{pn}Bank:\nInteret - Balance\n - Retrait \n- Depot \n- Transfert \n- Richest"
    },
    category: "💰 Economy",
    countDown: 15,
    role: 0,
    author: "Loufi | SiAM | Samuel\n\nModified: Shikaku|Haitani"
  },
  onStart: async function ({ args, message, event, api, usersData }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);

    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const info = await api.getUserInfo(user);
    const username = info[user].name;

 const bankDataPath = 'scripts/cmds/bankData.json';

if (!fs.existsSync(bankDataPath)) {
  const initialBankData = {};
  fs.writeFileSync(bankDataPath, JSON.stringify(initialBankData), "utf8");
}

const bankData = JSON.parse(fs.readFileSync(bankDataPath, "utf8"));

if (!bankData[user]) {
  bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
  fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
}


  bankBalance = bankData[user].bank || 0;

  const command = args[0]?.toLowerCase();
  const amount = parseInt(args[1]);
  const recipientUID = parseInt(args[2]);

    switch (command) {
case "depot":
  if (isNaN(amount) || amount <= 0) {
    return message.reply("----------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🙍‍♂𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗂𝗇𝗌𝖾𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝖽𝖾𝗉𝗈𝗍 𝗏𝖺𝗅𝗂𝖽𝖾😊•\n\n-----------------------");
  }


  if (bankBalance >= 1e104) {
    return message.reply("----------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🙅𝗍𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝖿𝖺𝗂𝗋𝖾 𝗎𝗇 𝖽𝖾́𝗉𝗈̂𝗍 𝗍𝗎 𝖺𝗌 𝖽𝖾́𝗃𝖺̀ $1e104 💢𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 •\n\n-----------------------");
  }

  if (userMoney < amount) {
    return message.reply("--------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n⛔𝖳𝗎 𝗇'𝖺𝗌 𝗉𝖺𝗌 𝗅𝖺 𝗌𝗈𝗆𝗆𝖾 𝖽𝖾 𝖽𝖾𝗉𝗈𝗍 𝖾𝗑𝗂𝗀𝖾́𝖾 🙅•\n\n------------------------");
  }

  bankData[user].bank += amount;
  await usersData.set(event.senderID, {
    money: userMoney - amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");

  return message.reply(`-----------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n〽𝖳𝗎 𝖺𝗌 𝖽𝖾́𝗉𝗈𝗌𝖾́ 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 $${amount} 𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 ✅•\n\n--------------------------`);
break;


case "retrait":
  const balance = bankData[user].bank || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("-----------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n😶𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝖾𝗇𝗍𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝗋𝖾𝗍𝗋𝖺𝗂𝗍 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝖾 🙄•\n\n--------------------------╝");
  }

  if (userMoney >= 1e104) {
    return message.reply("╔------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🚫𝗍𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝗋𝖾𝗍𝗂𝗋𝖾́ 𝖽𝖾 𝗅'𝖺𝗋𝗀𝖾𝗇𝗍 𝖽𝖾 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 𝗅𝗈𝗋𝗌𝗊𝗎𝖾 𝗍𝗎 𝖺𝗌 𝖽𝖾𝗃𝖺 1e104 ✔𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝗉𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅•\n\n╚--------------------╝");
  }

  if (amount > balance) {
    return message.reply("╔----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n💵𝖼𝖾𝗍𝗍𝖾 𝗌𝗈𝗆𝗆𝖾 𝖾𝗌𝗍 𝗌𝗎𝗉𝗉𝖾𝗋𝗂𝖾𝗎𝗋𝖾 𝖺𝗎 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾😐•\n\n╚-------------------------------╝");
  }

  // Continue with the withdrawal if the userMoney is not at 1e104
  bankData[user].bank = balance - amount;
  await usersData.set(event.senderID, {
    money: userMoney + amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
  return message.reply(`╔---------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n💲𝖳𝗎 𝖺𝗌 𝗋𝖾𝗍𝗂𝗋𝖾́ 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌✔ 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 $${amount} 𝖽𝖺𝗇𝗌 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾✴•\n\n╚----------------------------╝`);
  break;


case "solde":
  const formattedBankBalance = parseFloat(bankBalance);
  if (!isNaN(formattedBankBalance)) {
    return message.reply(`---------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n💦𝚃𝚄 𝙰𝚂: $${formatNumberWithFullForm(formattedBankBalance)} 𝙳𝙰𝙽𝚂 𝚃𝙰 𝙱𝙰𝙽𝚀𝚄𝙴💵\n\n----------------------`);
  } else {
    return message.reply("------------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n😕𝙴𝚁𝚁𝙴𝚄𝚁: 𝙻𝙴 𝚂𝙾𝙻𝙳𝙴 𝙳𝙴 𝚃𝙾𝙽 𝙲𝙾𝙼𝙿𝚃𝙴 𝙱𝙰𝙽𝙲𝙰𝙸𝚁𝙴 𝙽'𝙴𝚂𝚃 𝙿𝙰𝚂 𝚄𝙽 𝙽𝙾𝙼𝙱𝚁𝙴 𝚅𝙰𝙻𝙸𝙳𝙴 😪•\n\n-------------------------------");
  }
  break;



case "interet":
  const interestRate = 0.001; // 0.1% daily interest rate
  const lastInterestClaimed = bankData[user].lastInterestClaimed || 0;

  const currentTime = Date.now();
  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;

  if (timeDiffInSeconds < 86400) {
    // If it's been less than 24 hours since the last interest claim
    const remainingTime = Math.ceil(86400 - timeDiffInSeconds);
    const remainingHours = Math.floor(remainingTime / 3600);
    const remainingMinutes = Math.floor((remainingTime % 3600) / 60);

    return message.reply(`╔-------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n✨💜𝚃𝚄 𝙿𝙴𝚄𝚇 𝙴𝙽𝙲𝙾𝚁𝙴 𝚁𝙴𝙲𝙻𝙰𝙼𝙴𝚁 𝚃𝙴𝚂 𝙸𝙽𝚃𝙴𝚁𝙴𝚃𝚂 𝙳𝙰𝙽𝚂 ${remainingHours} 𝙷𝙴𝚄𝚁𝙴𝚂 𝙴𝚃 ${remainingMinutes} 𝙼𝙸𝙽𝚄𝚃𝙴𝚂 ☪•\n\n╚-----------------------------╝`);
  }

  const interestEarned = bankData[user].bank * (interestRate / 970) * timeDiffInSeconds;

  if (bankData[user].bank <= 0) {
        return message.reply("╔-----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🚫𝙰𝚅𝙰𝙽𝚃 𝙳𝙴 𝚁𝙴𝙲𝙻𝙰𝙼𝙴𝚁 𝚃𝙴𝚂 𝙸𝙽𝚃𝙴𝚁𝙴𝚃𝚂 𝙰𝚂𝚂𝚄𝚁𝙴 𝚃𝙾𝙸 𝙳'𝙰𝚅𝙾𝙸𝚁 𝙳𝙴 𝙻'𝙰𝚁𝙶𝙴𝙽𝚃 𝚂𝚄𝚁 𝚃𝙾𝙽 𝙲𝙾𝙼𝙿𝚃𝙴 𝙱𝙰𝙽𝙲𝙰𝙸𝚁𝙴✨😌•\n\n╚------------------------------╝");
  }

  bankData[user].lastInterestClaimed = currentTime;
  bankData[user].bank += interestEarned;

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


return message.reply(`╔----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n𝚃𝚄 𝚅𝙸𝙴𝙽𝚂 𝙳𝙴 𝚁𝙴𝙲𝙾𝙻𝚃𝙴́ 𝚄𝙽 𝙸𝙽𝚃𝙴́𝚁𝙴̂𝚃 𝙳𝙴 $${formatNumberWithFullForm(interestEarned)}\n\nIt 𝙰 𝙴́𝚃𝙴́ 𝙰𝙹𝙾𝚄𝚃𝙴́ 𝙰̀ 𝚃𝙾𝙽 𝙲𝙾𝙼𝙿𝚃𝙴 𝙱𝙰𝙽𝙲𝙰𝙸𝚁𝙴  😍•\n\n---------------------------------`);
break;


case "transfert":
  if (isNaN(amount) || amount <= 0) {
    return message.reply("╔-----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n😐𝚅𝙴𝚄𝙸𝙻𝙻𝙴𝚉 𝙸𝙽𝚂𝙴́𝚁𝙴𝚁 𝚄𝙽 𝙼𝙾𝙽𝚃𝙰𝙽𝚃 𝙳𝙴 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁𝚃 𝚅𝙰𝙻𝙸𝙳𝙴 😴 •\n\n╚----------------------------╝");
  }

  if (!recipientUID || !bankData[recipientUID]) {
    return message.reply("╔------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n😿𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝗇𝗈𝗇 𝗍𝗋𝗈𝗎𝗏𝖺𝖻𝗅𝖾. 𝖵𝖾́𝗋𝗂𝖿𝗂𝖾 𝖺̀ 𝗇𝗈𝗎𝗏𝖾𝖺𝗎 𝗅'𝗎𝗂𝖽 𝖿𝗈𝗎𝗋𝗇𝗂 😺•\n\n╚------------------------------╝");
  }

  if (recipientUID === user) {
    return message.reply("╔-----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🙌𝖳𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝗍𝖾 𝖿𝖺𝗂𝗋𝖾 𝗎𝗇 𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋𝗍 𝖺̀ 𝗍𝗈𝗂 𝗆𝖾𝗆𝖾•\n\n╚-----------------------------╝");
  }

  const senderBankBalance = parseFloat(bankData[user].bank) || 0;
  const recipientBankBalance = parseFloat(bankData[recipientUID].bank) || 0;

  if (recipientBankBalance >= 1e104) {
    return message.reply("╔════ஜ------۩۞۩------ஜ═══╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n💪𝗅𝖾 𝖼𝗈𝗆𝗉𝗍𝖾 𝖾𝗇 𝖻𝖺𝗇𝗊𝗎𝖾 𝖽𝖾 𝖼𝖾𝗍 𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖾𝗌𝗍  $1e104. 𝖳𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝗅𝗎𝗂 𝖿𝖺𝗂𝗋𝖾 𝗎𝗇 𝖽𝖾́𝗉𝗈̂𝗍 🙅•\n\n╚════ஜ-------۩۞۩------ஜ═══╝");
  }

  if (amount > senderBankBalance) {
    return message.reply("╔______________________╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n😿𝖳𝗎 𝗇'𝖺𝗌 𝗉𝖺𝗌 𝖽'𝖺𝗋𝗀𝖾𝗇𝗍 𝖺̀ 𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋𝖾𝗋 𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖾𝗇 𝖻𝖺𝗇𝗊𝗎𝖾•\n\n╚-----------------------------------╝");
  }

  bankData[user].bank -= amount;
  bankData[recipientUID].bank += amount;
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`╔---------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘🏦]\n\n🤗𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋𝖾́ 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌 $${amount} 𝖺 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖺𝗒𝖺𝗇𝗍 𝗅'𝗎𝗂𝖽 𝗌𝗎𝗂𝗏𝖺𝗇𝗍: ${recipientUID} 😌•\n\n╚------------------------------------╝`);
break;


case "richesse":
  const bankDataCp = JSON.parse(fs.readFileSync('scripts/cmds/bankData.json', 'utf8'));

  const topUsers = Object.entries(bankDataCp)
    .sort(([, a], [, b]) => b.bank - a.bank)
    .slice(0, 10);

  const output = (await Promise.all(topUsers.map(async ([userID, userData], index) => {
    const userName = await usersData.getName(userID);
    const formattedBalance = formatNumberWithFullForm(userData.bank); // Format the bank balance
    return `[${index + 1}. ${userName} - $${formattedBalance}]`;
  }))).join('\n');

  return message.reply("╔---------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🙂𝗍𝗈𝗉 10 𝖽𝖾𝗌 𝗆𝖾𝖼𝗌 𝖾𝗍 𝗆𝖾𝗎𝖿𝗌 𝗊𝗎𝗂 𝗈𝗇𝗍 𝗅𝖾 𝗉𝗅𝗎𝗌 𝖽𝖾 𝖿𝗋𝗂𝖼𝗌 𝖽𝖺𝗇𝗌 𝗅𝖾𝗎𝗋𝗌 𝖼𝗈𝗆𝗉𝗍𝖾𝗌 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 👑🤴:\n" + output + "\n\n╚------------------------------------╝");

break;


case "pret":
  const maxLoanAmount = 100000000; //increase of decrease this
  const userLoan = bankData[user].loan || 0;
  const loanPayed = bankData[user].loanPayed !== undefined ? bankData[user].loanPayed : true;

  if (!amount) {
    return message.reply("╔------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🕊𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗂𝗇𝗌𝖾𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝗉𝗋𝖾𝗍 𝗏𝖺𝗅𝗂𝖽𝖾✨😷•\n\n╚-------------------------------╝");
  }

  if (amount > maxLoanAmount) {
    return message.reply("╔------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n💵𝗅𝖾 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝗆𝖺𝗑𝗂𝗆𝖺𝗅 𝖽𝖾 𝗉𝗋𝖾̂𝗍 𝖾𝗌𝗍 $100000000 🙌•\n\n╚-------------------------------╝");
  }

  if (!loanPayed && userLoan > 0) {
    return message.reply(`╔---------------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\🕊𝖳𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝗈𝖻𝗍𝖾𝗇𝗂𝗋 𝖺 𝗇𝗈𝗎𝗏𝖾𝖺𝗎 𝗎𝗇 𝗉𝗋𝖾̂𝗍 𝖺𝗏𝖺𝗇𝗍 𝖽'𝖺𝗏𝗈𝗂𝗋 𝗋𝖾𝗆𝖻𝗈𝗎𝗋𝗌𝖾́ 𝗅𝖾 𝗉𝗋𝖾̂𝗍 𝗉𝗋𝖾́𝖼𝖾́𝖽𝖾𝗇𝗍.\n\n𝗍𝗎 𝖺𝗌 𝗎𝗇 𝗉𝗋𝖾̂𝗍 𝖽𝖾 : $${userLoan} 𝖺 𝗉𝖺𝗒𝖾𝗋 ✨😷•\n\n╚---------------------------------------╝`);
  }

  bankData[user].loan = userLoan + amount;
  bankData[user].loanPayed = false;
  bankData[user].bank += amount;

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`╔-----------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🪽𝖳𝗎 𝖺𝗌 𝗉𝗋𝗂𝗌 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌 𝗎𝗇 𝗉𝗋𝖾̂𝗍 𝖽'𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾  $${amount}. 𝖵𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗇𝗈𝗍𝖾𝗓 𝗊𝗎𝖾 𝗏𝗈𝗌 𝗉𝗋𝖾𝗍𝗌 𝖽𝗈𝗂𝗏𝖾𝗇𝗍 𝗋𝖾𝗆𝖻𝗈𝗎𝗋𝗌𝖾́𝗌 🕊•\n\n╚---------------------------------╝`);

break;

case "Paiement":
  const loanBalance = bankData[user].loan || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("╔-------------------------------╗\n\🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n👻𝖵𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝖾𝗇𝗍𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝗏𝖺𝗅𝗂𝖽𝖾 𝗉𝗈𝗎𝗋 𝗉𝖺𝗒𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝗉𝗋𝖾̂𝗍 🕊•\n\n╚------------------------------╝");
  }

  if (loanBalance <= 0) {
    return message.reply("--------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\𝖳𝗎 𝗇'𝖺𝗌 𝗉𝖺𝗌 𝖽𝖾 𝗉𝗋𝖾𝗍 𝖺 𝗉𝖺𝗒𝖾𝗋 •\n\n✧⁺⸜(●˙▾˙●)⸝⁺✧ʸᵃʸ\n\n╚════ஜ------------------╝");
  }

  if (amount > loanBalance) {
    return message.reply(`╔-----------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n👻𝗅𝖾 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾𝗆𝖺𝗇𝖽𝖾́ 𝗉𝗈𝗎𝗋 𝗉𝖺𝗒𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝗉𝗋𝖾̂𝗍 𝖾𝗌𝗍 𝗌𝗎𝗉𝖾́𝗋𝗂𝖾𝗎𝗋 𝖺̀ 𝗏𝗈𝗍𝗋𝖾 𝗈𝖿𝖿𝗋𝖾. 𝖲𝗏𝗉 𝗉𝖺𝗒𝖾𝗋 𝗅𝖾 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖾𝗑𝖺𝖼𝗍𝖾😊•\n𝗏𝗈𝗌 𝗉𝗋𝖾̂𝗍 𝖺𝗎 𝗍𝗈𝗍𝖺𝗅 𝗌𝗈𝗇𝗍: $${loanBalance}\n\n╚---------------------------------------╝`);
  }

  if (amount > userMoney) {
    return message.reply(`╔-------------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🚫𝗍𝗎 𝗇'𝖺𝗌 𝗉𝖺𝗌 $${amount} 𝖽𝖺𝗇𝗌 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 𝗉𝗈𝗎𝗋 𝗉𝖺𝗒𝖾𝗋 𝗍𝗈𝗇 𝗉𝗋𝖾̂𝗍 😢•\n\n╚✰𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡✰╝`);
  }

  bankData[user].loan = loanBalance - amount;

  if (loanBalance - amount === 0) {
    bankData[user].loanPayed = true;
  }

  await usersData.set(event.senderID, {
    money: userMoney - amount
  });

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`______________________\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🕊𝗋𝖾𝗉𝖺𝗒𝖾𝗋 👻 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌 $${amount} 𝗅𝖾 𝗉𝗋𝖾̂𝗍 𝗉𝗋𝖾̂𝗍𝖾́. 𝖨𝗅 𝗋𝖾𝗌𝗍𝖾 𝖺̀ 𝗉𝖺𝗒𝖾𝗋  💵: $${bankData[user].𝗉𝗋𝖾̂𝗍} ✔•\n\n________________________`);

break;

default:
  return message.reply("༐྿..𝗛𝗔𝗜𝗧𝗔𝗡𝗜..྿༐____________________\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦]\n\n🕊𝚅𝙴𝚄𝙸𝙻𝙻𝙴𝚉 𝙸𝙽𝚂𝙴𝚁𝙴𝚁 𝙻'𝚄𝙽𝙴 𝙳𝙴𝚂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝙴𝚂 𝚂𝚄𝙸𝚅𝙰𝙽𝚃𝙴𝚂 :\n____________________\n ༐⸙𝐑𝐞𝐭𝐫𝐚𝐢𝐭༐⸙\n_______________________\n ༐⸙𝐒𝐨𝐥𝐝𝐞༐⸙ \n______________________\n༐⸙ 𝐈𝐧𝐭𝐞𝐫𝐞𝐭༐⸙ \n______________________\n ༐⸙𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐭 ༐⸙\n_____________________ \n ༐⸙𝐃𝐞𝐩𝐨𝐭༐⸙ \n________________________\n༐⸙ 𝐏𝐫𝐞𝐭 ༐⸙\n______________________\n༐⸙𝐏𝐚𝐢𝐞𝐦𝐞𝐧𝐭༐⸙___________________\n ༐👻..𝗚𝗛𝗢𝗦𝗧...🔥༐");
}
  }
};

// Function to format a number with full forms (e.g., 1 Thousand, 133 Million, 76.2 Billion)
function formatNumberWithFullForm(number) {
  const fullForms = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Tresvigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sesvigintillion",
    "Septemvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion",
    "Untrigintillion",
    "Duotrigintillion",
    "Googol",
  ];

  // Calculate the full form of the number (e.g., Thousand, Million, Billion)
  let fullFormIndex = 0;
  while (number >= 1000 && fullFormIndex < fullForms.length - 1) {
    number /= 1000;
    fullFormIndex++;
  }

  // Format the number with two digits after the decimal point
  const formattedNumber = number.toFixed(2);

  // Add the full form to the formatted number
  return `${formattedNumber} ${fullForms[fullFormIndex]}`;
                                                                                                       }
