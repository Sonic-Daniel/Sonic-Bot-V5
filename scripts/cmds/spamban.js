const fs = require("fs-extra");
const { getTime } = global.utils;

const spamStatesFile = "spamStates.json";
const bannedUsersFile = "bannedUsers.json";

let spamStates = loadStates(spamStatesFile);
let bannedUsers = loadStates(bannedUsersFile);

let messageCounts = {};
const spamThreshold = 10;
const spamInterval = 60000;

function loadStates(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveStates(file, states) {
  fs.writeFileSync(file, JSON.stringify(states, null, 2));
}

module.exports = {
  config: {
    name: "spamban",
    version: "1.0",
    author: "Vex_kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "Ban spammers from using the bot",
    longDescription: "Ban users from using the bot if they spam commands continuously",
    category: "box",
    guide: "{pn} [on|off|unban <userID>|list]",
  },

  onStart: async function ({ api, event, args, getLang, usersData }) {
    const threadID = event.threadID;

    if (!spamStates[threadID]) {
      spamStates[threadID] = 'off';
      saveStates(spamStatesFile, spamStates);
    }

    if (args[0] === 'off') {
      spamStates[threadID] = 'off';
      saveStates(spamStatesFile, spamStates);
      api.sendMessage("Spamban is now turned off for this chat.", threadID, event.messageID);
    } else if (args[0] === 'on') {
      spamStates[threadID] = 'on';
      saveStates(spamStatesFile, spamStates);
      api.sendMessage("Spamban is now turned on for this chat.", threadID, event.messageID);
    } else if (args[0] === 'unban') {
      const userID = args[1];
      if (!userID) return api.sendMessage("Please provide a user ID to unban.", threadID, event.messageID);

      const userData = await usersData.get(userID);
      const name = userData.name;
      const status = userData.banned.status;

      if (!status) {
        return api.sendMessage(`User with ID ${userID} is not banned.`, threadID, event.messageID);
      }

      await usersData.set(userID, {
        banned: {}
      });

      delete bannedUsers[userID];
      saveStates(bannedUsersFile, bannedUsers);
      api.sendMessage(`User ${userID} (${name}) has been unbanned.`, threadID, event.messageID);
    } else if (args[0] === 'list') {
      let message = "Banned Users:\n";
      for (const userID in bannedUsers) {
        const userData = await usersData.get(userID);
        const name = userData.name;
        const { reason, date } = userData.banned;
        message += `\nID: ${userID}\nName: ${name}\nReason: ${reason}\nDate: ${date}\n`;
      }
      if (message === "Banned Users:\n") {
        message = "No users are currently banned.";
      }
      api.sendMessage(message, threadID, event.messageID);
    }
  },

  onChat: async function ({ api, event, usersData, getLang }) {
    const { threadID, senderID } = event;

    if (spamStates[threadID] !== 'on' || bannedUsers[senderID]) return;

    if (!messageCounts[threadID]) {
      messageCounts[threadID] = {};
    }

    if (!messageCounts[threadID][senderID]) {
      messageCounts[threadID][senderID] = {
        count: 1,
        timer: setTimeout(() => {
          delete messageCounts[threadID][senderID];
        }, spamInterval),
      };
    } else {
      messageCounts[threadID][senderID].count++;
      if (messageCounts[threadID][senderID].count > spamThreshold) {
        const time = getTime("DD/MM/YYYY HH:mm:ss");
        const reason = "Spamming commands";

        const userData = await usersData.get(senderID);
        const name = userData.name;

        await usersData.set(senderID, {
          banned: {
            status: true,
            reason,
            date: time
          }
        });

        bannedUsers[senderID] = true;
        saveStates(bannedUsersFile, bannedUsers);
        api.sendMessage(`User ${senderID} (${name}) has been banned for spamming commands.`, threadID);
      }
    }
  },
};
