const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");

// Load session (for persistent login)
const { state, saveState } = useSingleFileAuthState("./session.json");

// Initialize WhatsApp connection
const startBot = () => {
    const bot = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["SATHANIC-V10", "Safari", "1.0"]
    });

    // Save session state
    bot.ev.on("creds.update", saveState);

    // Handle connection updates
    bot.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("Connection closed. Reconnecting:", shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log("Bot connected successfully!");
        }
    });
    const config = require("./config");

// Example usage
console.log(`Bot Name: ${config.SATHANIC-V10}`);
console.log(`Owner: ${config.919778158839}`);

    // Listen for incoming messages
    bot.ev.on("messages.upsert", async (message) => {
        const msg = message.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Message from ${sender}: ${text}`);

        // Basic command handling
        if (text?.toLowerCase() === "!ping") {
            await bot.sendMessage(sender, { text: "🏓 Pong!" });
        } else if (text?.toLowerCase() === "!menu") {
            await bot.sendMessage(sender, { text: "📜 *SATHANIC-V10 Menu*\n1️⃣ !ping - Test bot response\n2️⃣ !hello - Greetings" });
        } else if (text?.toLowerCase() === "!hello") {
            await bot.sendMessage(sender, { text: "👋 Hello! How can I help you?" });
        }
    });
};

const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./session.json");

const bot = makeWASocket({
    auth: state,
    browser: ["SATHANIC-V10", "Chrome", "1.0"]
});

bot.ev.on("creds.update", saveState);

bot.ev.on("connection.update", (update) => {
    const { connection } = update;
    if (connection === "open") {
        console.log("✅ Bot is online!");
    } else if (connection === "close") {
        console.log("❌ Disconnected! Restarting...");
        process.exit(1);
    }
});

// Start the bot
startBot();
