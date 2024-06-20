const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const userDataFilePath = path.join(__dirname, 'user.json');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "Play quiz",
    longDescription: "Play a quiz based on different categories",
    category: "fun",
    guide: {
      en: "{p}quiz2 list | top | category"
    }
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    if (args.length === 1 && args[0] === "list") {
      const categories = [
        "gk",
        "music",
        "videogame",
        "naturescience",
        "computerscience",
        "math",
        "mythology",
        "sports",
        "geography",
        "history",
        "politics",
        "art",
        "celebrety",
        "anime",
        "cartoon"
      ];
      return message.reply(`Available categories: ${categories.join(", ")}`);
    } else if (args.length === 1 && args[0] === "top") {
      const topUsers = await getTopUsers(usersData, api);
      if (topUsers.length === 0) {
        return message.reply("No users found.");
      } else {
        const topUsersString = topUsers.map((user, index) => `${index + 1}. ${user.username}: ${user.money} coins`).join("\n");
        return message.reply(`Top 5 pro players:\n${topUsersString}`);
      }
    } else if (args.length === 1) {
      const category = args[0].toLowerCase();
      const quizData = await fetchQuiz(category);
      if (!quizData) {
        return message.reply("Failed to fetch quiz question. Please try again later.");
      }

      const { question, options } = quizData;
      const optionsString = options.map((opt, index) => `${String.fromCharCode(65 + index)}.${opt.answer}`).join("\n");

      const sentQuestion = await message.reply(`Question: ${question}\nOptions:\n${optionsString}`);

      global.GoatBot.onReply.set(sentQuestion.messageID, {
        commandName: this.config.name,
        messageID: sentQuestion.messageID,
        correctAnswerLetter: quizData.correct_answer_letter
      });

      setTimeout(async () => {
        try {
          await message.unsend(sentQuestion.messageID);
        } catch (error) {
          console.error("Error while unsending question:", error);
        }
      }, 20000); 
    } else {
      return message.reply("Invalid usage. Type `quiz list` to see available categories, `quiz top` to see top players, or `quiz {category}` to start a quiz.");
    }
  },

  onReply: async function ({ message, event, Reply, usersData }) {
    const userAnswer = event.body.trim();
    const correctAnswerLetter = Reply.correctAnswerLetter.toUpperCase();

    if (userAnswer === correctAnswerLetter) {
      const userID = event.senderID;
      await addCoins(userID, 1000, usersData);
      await message.reply("🎉🎊 𝐅𝐄́𝐋𝐈𝐂𝐈𝐓𝐀𝐓𝐈𝐎𝐍! 𝐓'𝐀𝐒 𝐓𝐑𝐎𝐔𝐕𝐄𝐑 𝐋𝐀 𝐁𝐎𝐍𝐍𝐄 𝐑𝐄𝐏𝐎𝐍𝐒𝐄.𝐓'𝐀𝐒 𝐑𝐄𝐂̧𝐔 ➪ 1000 𝐏𝐈𝐄̀𝐂𝐄𝐒.");
    } else {
      await message.reply(`🤣 𝐅𝐀𝐔𝐗.! 𝐋𝐀 𝐁𝐎𝐍𝐍𝐄 𝐑𝐄𝐏𝐎𝐍𝐒𝐄 𝐄́𝐓𝐀𝐈𝐓 ➪: ${correctAnswerLetter}`);
    }

    try {
      await message.unsend(event.messageID);
    } catch (error) {
      console.error("Error while unsending message:", error);
    }

    const { commandName, messageID } = Reply;
    if (commandName === this.config.name) {
      try {
        await message.unsend(messageID);
      } catch (error) {
        console.error("Error while unsending question:", error);
      }
    }
  }
};

async function fetchQuiz(category) {
  try {
    const response = await axios.get(`https://new-quiz-black.vercel.app/quiz?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    return null;
  }
}

async function addCoins(userID, amount, usersData) {
  try {
    let userData = await usersData.get(userID);
    if (!userData) {
      userData = { money: 0 };
    }
    userData.money += amount;
    await usersData.set(userID, userData);
  } catch (error) {
    console.error("Error adding coins:", error);
  }
}

async function getTopUsers(usersData, api) {
  const allUserData = await getAllUserData(usersData);
  const userIDs = Object.keys(allUserData);
  const topUsers = [];

  for (const userID of userIDs) {
    api.getUserInfo(userID, async (err, userInfo) => {
      if (err) {
        console.error("Failed to retrieve user information:", err);
        return;
      }

      const username = userInfo[userID].name;
      if (username) {
        const userData = allUserData[userID];
        topUsers.push({ username, money: userData.money });
      }
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topUsers.sort((a, b) => b.money - a.money).slice(0, 5));
    }, 2000);
  });
}

async function getAllUserData(usersData) {
  try {
    const allUserData = {};
    const allUsers = await usersData.all();
    allUsers.forEach(user => {
      allUserData[user.userID] = user.value;
    });
    return allUserData;
  } catch (error) {
    console.error("Error reading user data:", error);
    return {};
  }
    }
