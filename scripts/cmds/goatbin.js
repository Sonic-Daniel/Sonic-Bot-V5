const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  config: {
    name: "goatbin",
    aliases: ["bin"],
    version: "1.0",
    author: "GoatMart",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Upload files and get cmds short links"
    },
    longDescription: {
      en: "This command allows you to upload files to goatbin and sends the link to the file."
    },
    category: "owner",
    guide: {
      en: "To use this command, type goatbin <filename>. The file must be located in the 'cmds' folder."
    }
  },

  onStart: async function({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage('Please provide the filename to upload. Usage: {p}pastebin <filename>', event.threadID, event.messageID);
    }
    const permission = ["100090405019929"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("Imbécile....t'as rien à foutre dans les fichiers de ʬʆʬ Sønïč Shïsûį ʬɸʬ😒🖕", event.threadID, event.messageID);
    }
    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('Invalid command.', event.threadID, event.messageID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        return api.sendMessage('An error occurred while reading the file.', event.threadID, event.messageID);
      }

      try {
        const response = await axios.post('https://g-v1.onrender.com/v1/paste', { code: data });

        if (response.data && response.data.link) {
          const Link = response.data.link;
          api.sendMessage(Link, event.threadID, event.messageID);
        } else {
          api.sendMessage('Failed to upload the command to . Please try again later.', event.threadID, event.messageID);
        }
      } catch (uploadErr) {
        console.error(uploadErr);
        api.sendMessage('An error occurred while uploading the command.', event.threadID, event.messageID);
      }
    });
  },
};
