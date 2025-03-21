const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./session.json");
const qrcode = require("qrcode-terminal");

// Function to generate session
async function generateSession() {
    const bot = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["SATHANIC-V10", "Safari", "1.0"]
    });

    // Save session state
    bot.ev.on("creds.update", saveState);

    // Show QR Code for login
    bot.ev.on("connection.update", (update) => {
        const { qr, connection } = update;
        if (qr) {
            console.log("📲 Scan this QR code to log in:");
            qrcode.generate(qr, { small: true });
        }
        if (connection === "open") {
            console.log("✅ Session successfully generated!");
            process.exit(0);
        }
    });
}

// Run the session generator
generateSession();
