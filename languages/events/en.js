module.exports = {
	// You can customize the language here or directly in the command files
	autoUpdateThreadInfo: {},
	checkwarn: {
		text: {
			warn: "Member %1 has been warned 3 times before and has been banned from the chat box\n- Name: %1\n- Uid: %2\n- To unban, please use the \"%3warn unban <uid>\" command (with uid is the uid of the person you want to unban)",
			needPermission: "Bot needs administrator permission to kick banned members"
		}
	},
	leave: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "tient tellement à sa vie 🩸",
			leaveType2: "ton cœur 🫀 est à moi 🥱"
		}
	},
	logsbot: {
		text: {
			title: "===🫀🩸SONIC'S☘️INFO🩸🫀===",
			added: "\n🫠\nEvent: bot has been added to a new group\n- Added by: %1",
			kicked: "\n🥱\nEvent: bot has been kicked\n- Kicked by: %1",
			footer: "\n- User ID: %1\n- Group: %2\n- Group ID: %3\n- Time: %4"
		}
	},
	onEvent: {},
	welcome: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: "Thank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help",
			multiple1: "you",
			multiple2: "you guys"
		}
	}
};
