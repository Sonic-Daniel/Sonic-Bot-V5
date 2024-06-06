module.exports = {
  config: {
    name: "fb",
    version: "1.0",
    author: "Shikaki",
    countDown: 60,
    role: 0,
    shortDescription: "Get user information and avatar",
    longDescription: "Get user information and avatar by mentioning",
    category: "image",
  },

   onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      // Check if the argument is a numeric UID
      if (/^\$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\hp\d=(\)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      // If no UID was extracted from the argument, use the default logic
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "Girl";
          break;
        case 2:
          genderText = "Boy";
          break;
        default:
          genderText = "Unknown";
      }

      // Construct and send the user's information with avatar
      const userInformation = ` 🍀 Name: 🎀${userInfo[uid].name}🎀\ 
🍀 Profile URL: 🌾${userInfo[uid].profileUrl}🌾\ 
🍀 Gender: 🌱${genderText}🌱\
🍀 User Type: 🍁${userInfo[uid].type}🍁\ 
🍀 Is Friend: 🌿${userInfo[uid].isFriend ? "Yes" : "No"}🌿\ 
🍀 Is Birthday today: 🎀${userInfo[uid].isBirthday ? "Yes" : "No"}🎀`;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });
    });
  }
}
