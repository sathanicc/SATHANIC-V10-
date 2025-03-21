const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./session.json");
const { handleCommand } = require("./modules/commands");
const { updateUserMessages } = require("./modules/database");
const { logMessage } = require("./modules/logger");

const bot = makeWASocket({ auth: state });

bot.ev.on("creds.update", saveState);

bot.ev.on("messages.upsert", async (message) => {
    const msg = message.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    // Log message and update user data
    logMessage(sender, text);
    updateUserMessages(sender);

    // Handle commands
    handleCommand(bot, msg, sender);
});

bot.ev.on("connection.update", (update) => {
    if (update.connection === "open") {
        console.log("✅ Bot is online!");
    } else if (update.connection === "close") {
        console.log("❌ Disconnected! Restarting...");
        process.exit(1);
    }
});
