const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    config: {
        name: "fakechat",
        aliases: ["fc"],
        version: "1.0",
        author: "Vex_kshitiz",
        countDown: 5,
        role: 0,
        shortDescription: "",
        longDescription: "fake fb chat",
        category: "fun",
        guide: "{p} fakechat uid | {text} or {p} fakechat @mention | {text} or reply to someone text by fakechat {text} -{theme}"
    },

    onStart: async function ({ event, message, usersData, api, args }) {
        const { senderID, type, messageReply, mentions } = event;
        let uid;
        let mentionName;
        let textSegments = args.slice(1).join(" ").split(" | ");
        let theme = null;
        const themeMatch = textSegments.join(" ").match(/-\d+$/);

        if (themeMatch) {
            theme = themeMatch[0];
            textSegments = textSegments.join(" ").replace(theme, '').split(" | ");
        }

        if (mentions && Object.keys(mentions).length > 0) {
            uid = Object.keys(mentions)[0];
            mentionName = mentions[uid].replace('@', '').split(' ')[0];
            textSegments = args.slice(2).join(" ").split(" | ");
        } else if (/^\d+$/.test(args[0])) {
            uid = args[0];
        } else if (type === "message_reply") {
            uid = messageReply.senderID;
            textSegments = args.join(" ").split(" | ");
        } else {
            return message.reply("Please mention or provide a UID.");
        }

        if (theme) {
            textSegments = textSegments.map(segment => segment.trim().replace(theme, ''));
        }

        try {
            const userInfo = await getUserInfo(api, uid);
            const firstName = userInfo.name.split(' ')[0];
            const avatarUrl = await usersData.getAvatarUrl(uid);

            const canvasWidth = 1000;
            const canvasHeight = 800;
            const canvas = createCanvas(canvasWidth, canvasHeight);
            const ctx = canvas.getContext('2d');

            const fontUrl = 'https://drive.google.com/uc?export=download&id=1MYZkDHgHtGgyVEf2bFrOc0A-tlFvzYqL'; 

           
            const fontPath = await downloadFont(fontUrl);
            registerFont(fontPath, { family: 'custom' });

            let backgroundImagePath;
            switch (theme) {
                case '-1':
                    backgroundImagePath = await downloadImage('https://i.ibb.co/qF0d7dG/download-17.jpg', 'theme-1.jpg');
                    break;
                case '-2':
                    backgroundImagePath = await downloadImage('https://i.ibb.co/PYHkhjY/download-18.jpg', 'theme-2.jpg');
                    break;
                case '-3':
                    backgroundImagePath = await downloadImage('https://i.ibb.co/fnMYNxq/Bubble-tea-wallpaper-w-boba-pearls.jpg', 'theme-3.jpg');
                    break;
                default:
                    backgroundImagePath = null;
            }

            if (backgroundImagePath) {
                const backgroundImage = await loadImage(backgroundImagePath);
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            } else {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            const nameX = 165;
            const nameY = 50;
            ctx.font = '25px Arial';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'left';
            ctx.fillText(mentionName || firstName, nameX, nameY);

            const maxContainerWidth = canvas.width - 250;
            const lineHeight = 40;
            const borderRadius = 50;
            const sideGap = 20;
            const rightSideGap = 20;
            let currentX = 120;
            let currentY = 80;
            const gapBetweenContainers = 25;
            let lastContainerHeight = 0;
            let totalHeight = 10;

            const chatBubblePositions = [];

            const firstBubbleBorderRadius = {
                topLeft: 50,
                topRight: 50,
                bottomRight: 50,
                bottomLeft: 0
            };

            const middleBubbleBorderRadius = {
                topLeft: 0,
                topRight: 50,
                bottomRight: 50,
                bottomLeft: 0
            };

            const lastBubbleBorderRadius = {
                topLeft: 0,
                topRight: 50,
                bottomRight: 50,
                bottomLeft: 50
            };

            for (let i = 0; i < textSegments.length; i++) {
                const text = textSegments[i];
                const lines = splitText(ctx, text, maxContainerWidth - sideGap * 2 - 20);
                let maxLineWidth = 0;
                lines.forEach(line => {
                    const lineWidth = ctx.measureText(line).width;
                    maxLineWidth = Math.max(maxLineWidth, lineWidth);
                });

                let containerWidth = Math.min(maxContainerWidth, maxLineWidth + sideGap * 8);
                if (i === 0) {
                    containerWidth += rightSideGap;
                }

                const textHeight = lines.length * lineHeight;
                const containerHeight = textHeight + 30;

                chatBubblePositions.push({
                    x: currentX,
                    y: currentY,
                    height: containerHeight
                });

                let containerColor;
                switch (theme) {
                    case '-1':
                        containerColor = 'rgba(128, 0, 128, 0.8)';
                        break;
                    case '-2':
                        containerColor = 'rgba(80, 80, 80, 0.8)';
                        break;
                    case '-3':
                        containerColor = 'rgba(76, 41, 0, 0.8)';
                        break;
                    default:
                        containerColor = 'rgba(100, 100, 100, 0.8)';
                }

                let bubbleBorderRadius;
                if (textSegments.length === 1) {
                    bubbleBorderRadius = {
                        topLeft: 50,
                        topRight: 50,
                        bottomRight: 50,
                        bottomLeft: 50
                    };
                } else if (i === 0) {
                    bubbleBorderRadius = firstBubbleBorderRadius;
                } else if (i === textSegments.length - 1) {
                    bubbleBorderRadius = lastBubbleBorderRadius;
                } else {
                    bubbleBorderRadius = middleBubbleBorderRadius;
                }

                ctx.fillStyle = containerColor;
                ctx.beginPath();
                ctx.moveTo(currentX + bubbleBorderRadius.topLeft + sideGap, currentY - 10);
                ctx.lineTo(currentX + containerWidth - bubbleBorderRadius.topRight - sideGap, currentY - 10);
                ctx.quadraticCurveTo(currentX + containerWidth - sideGap, currentY - 10, currentX + containerWidth - sideGap, currentY + bubbleBorderRadius.topRight - 10);
                ctx.lineTo(currentX + containerWidth - sideGap, currentY + containerHeight - bubbleBorderRadius.bottomRight + 10);
                ctx.quadraticCurveTo(currentX + containerWidth - sideGap, currentY + containerHeight + 10, currentX + containerWidth - bubbleBorderRadius.bottomRight - sideGap, currentY + containerHeight + 10);
                ctx.lineTo(currentX + bubbleBorderRadius.bottomLeft + sideGap, currentY + containerHeight + 10);
                ctx.quadraticCurveTo(currentX + sideGap, currentY + containerHeight + 10, currentX + sideGap, currentY + containerHeight - bubbleBorderRadius.bottomLeft + 10);
                ctx.lineTo(currentX + sideGap, currentY + bubbleBorderRadius.topLeft - 10);
                ctx.quadraticCurveTo(currentX + sideGap, currentY - 10, currentX + bubbleBorderRadius.topLeft + sideGap, currentY - 10);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#FFFFFF';
                ctx.font = '35px "custom"';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';

                let textX = currentX + sideGap + 30;
                let textY = currentY + 15;

                lines.forEach(line => {
                    ctx.fillText(line, textX, textY);
                    textY += lineHeight;
                });

                currentY += containerHeight + gapBetweenContainers;
                lastContainerHeight = containerHeight;
                totalHeight += containerHeight + gapBetweenContainers;
            }

            const profilePicSize = 65;
            const profilePicX = 55;
            let profilePicY = 30;
            if (chatBubblePositions.length > 0) {
                const lastChatBubble = chatBubblePositions[chatBubblePositions.length - 1];
                profilePicY = lastChatBubble.y + lastChatBubble.height - profilePicSize;
            }

            const avatarImage = await loadImage(avatarUrl);
            ctx.beginPath();
            ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, profilePicSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImage, profilePicX, profilePicY, profilePicSize, profilePicSize);

            const outputPath = path.join(__dirname, 'fakechat-output.png');
            const out = fs.createWriteStream(outputPath);
            const stream = canvas.createPNGStream();
            stream.pipe(out);
            out.on('finish', () => {
                console.log('Fake chat image created successfully!');
                message.reply({
                    body: '',
                    attachment: fs.createReadStream(outputPath)
                }, () => fs.unlinkSync(outputPath));
            });
        } catch (err) {
            console.error('Error in onStart fakechat', err);
        }
    }
};

async function getUserInfo(api, uid) {
    return new Promise((resolve, reject) => {
        api.getUserInfo(uid, (err, ret) => {
            if (err) return reject(err);
            resolve(ret[uid]);
        });
    });
}

async function downloadFont(fontUrl) {
    const response = await axios.get(fontUrl, { responseType: 'arraybuffer' });
    const fontData = Buffer.from(response.data, 'binary');
    const fontPath = path.join(__dirname, `font-${Date.now()}.ttf`);
    fs.writeFileSync(fontPath, fontData);
    return fontPath;
}

async function downloadImage(imageUrl, imageName) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imagePath = path.join(__dirname, imageName);
    fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));
    return imagePath;
}

function splitText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;

        if ((currentLine.split(' ').length === 3 && Math.random() < 0.5) || currentLine.split(' ').length === 4) {
            lines.push(currentLine.trim());
            currentLine = '';
        }

        if (currentLine === '') {
            currentLine = word;
        } else {
            currentLine += ' ' + word;
        }
    }

    if (currentLine !== '') {
        lines.push(currentLine.trim());
    }

    return lines;
          }
