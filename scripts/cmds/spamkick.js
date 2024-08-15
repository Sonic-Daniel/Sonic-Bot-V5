let messageCounts = {};

const spamThreshold = 5;

const spamInterval = 60;



module.exports = {

  config: {

    name: "spamkick",

    aliases: [],

    version: "1.0",

    author: "Jonell Magallanes & BLUE & kshitiz",

    countDown: 5,

    role: 0,

    shortDescription: "Automatically detect and act on spam",

    longDescription: "Automatically detect and act on spam",

    category: "admin",

    guide: "{pn}",

  },



  onStart: async function ({ api, event, args }) {

    api.sendMessage("This command functionality kicks the user when they are spamming in group chats", event.threadID, event.messageID);

  },



  onChat: function ({ api, event }) {

    const { threadID, messageID, senderID } = event;



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

        api.sendMessage("🚨🛡| Spam détecté. Le bot supprimera le spammeur du groupe ", threadID, messageID);

        api.removeUserFromGroup(senderID, threadID);

      }

    }

  },

}
