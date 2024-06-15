const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "spygc",
    version: "1.0",
    author: "Kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "Spy the group chats that bot is in.",
    longDescription: "",
    category: "box",
    guide: {
      en: "{p}{n} reply by number",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const a = await api.getThreadList(10, null, ['INBOX']);

      const b = a.filter(group => group.threadName !== null);

      if (b.length === 0) {
        api.sendMessage('No group chats found.', event.threadID);
      } else {
        const c = b.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}`
        );
        const d = `╭─╮\n│𝐋𝐢𝐬𝐭 𝐨𝐟 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭𝐬:\n${c.map(line => `${line}`).join("\n")}\n╰───────────ꔪ`;

        const e = await api.sendMessage(d, event.threadID);
        global.GoatBot.onReply.set(e.messageID, {
          commandName: 'spygc',
          messageID: e.messageID,
          author: event.senderID,
          groupList: b,
        });
      }
    } catch (f) {
      console.error("Error listing group chats", f);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, groupList } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const a = parseInt(args[0], 10);

    if (isNaN(a) || a <= 0) {
      api.sendMessage('Invalid input.\nPlease provide a valid number.', event.threadID, event.messageID);
      return;
    }

    try {
      if (a > groupList.length) {
        api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
        return;
      }

      const b = groupList[a - 1];
      const c = await api.getThreadInfo(b.threadID);

      let d = c.participantIDs.length;
      let e = 0;
      let f = 0;
      let g = '';
      let h = c.adminIDs;
      let i = c.adminIDs.length;
      let j = c.messageCount;
      let k = c.emoji;
      let l = c.threadName;
      let m = c.threadID;

      for (let n = 0; n < h.length; n++) {
        const o = (await api.getUserInfo(h[n].id));
        const p = o[h[n].id].name;
        g += '•' + p + '\n';
      }

      let q = c.approvalMode;
      let r = q == false ? 'Turned off' : q == true ? 'Turned on' : 'Kh';

      const s = await this.getMemberNames(api, c.participantIDs);
      let t = s.join(" │ ");

      const u = `𝗚𝗖 𝗡𝗔𝗠𝗘 : ${l}\n𝗚𝗖 𝗧𝗜𝗗 :${m}\n𝗔𝗣𝗣𝗥𝗢𝗩𝗔𝗟 : ${r}\n𝗘𝗠𝗢𝗝𝗜 : ${k}\n𝗠𝗔𝗟𝗘𝗦 : ${e}\n𝗙𝗘𝗠𝗔𝗟𝗘𝗦 : ${f}\n𝗔𝗗𝗠𝗜𝗡𝗦 :${g}\n𝗧𝗢𝗧𝗔𝗟 𝗠𝗦𝗚𝗦 :${j} msgs.\n\n𝗠𝗘𝗠𝗕𝗘𝗥𝗦 :\n${t}\n\n`;

      api.sendMessage(u, event.threadID, event.messageID);
    } catch (v) {
      console.error("Error", v);
      api.sendMessage('error', event.threadID, event.messageID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },

  getMemberNames: async function (api, participantIDs) {
    const a = [];
    for (const b of participantIDs) {
      try {
        const c = await api.getUserInfo(b);
        const d = c[b].name;
        a.push(d);
      } catch (e) {
        console.error(`Error fetching user info for participant ID: ${b}`, e);
        a.push(`[Error fetching user info for participant ID: ${b}]`);
      }
    }
    return a;
  },
};
