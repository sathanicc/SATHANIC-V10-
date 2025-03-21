const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./session.json");
const qrcode = require("qrcode-terminal");

// Initialize WhatsApp connection
const startQR = () => {
    const bot = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["SATHANIC-V10", "Safari", "1.0"]
    });

    // Save session state
    bot.ev.on("creds.update", saveState);

    // Display QR code in terminal
    bot.ev.on("connection.update", (update) => {
        const { qr } = update;
        if (qr) {
            console.log("📲 Scan this QR code to log in:");
            qrcode.generate(qr, { small: true });
        }
    });

    // Handle successful connection
    bot.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "open") {
            console.log("✅ Bot is successfully connected!");
        } else if (connection === "close") {
            console.log("❌ Connection closed. Please restart.");
        }
    });
};

// Start the QR code process
startQR();
