const { getLangText } = require("./language");

async function handleCommand(bot, msg, sender) {
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!text) return;

    const command = text.toLowerCase();

    if (command === "!ping") {
        await bot.sendMessage(sender, { text: getLangText("en", "ping") });
    } else if (command === "!hello") {
        await bot.sendMessage(sender, { text: getLangText("en", "hello") });
    } else {
        await bot.sendMessage(sender, { text: "❌ Unknown command!" });
    }
}

module.exports = { handleCommand };
