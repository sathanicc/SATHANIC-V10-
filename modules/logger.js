const fs = require("fs");
const logFile = "./logs.txt";

// Log messages
function logMessage(sender, message) {
    const log = `[${new Date().toISOString()}] ${sender}: ${message}\n`;
    fs.appendFileSync(logFile, log);
}

// Log errors
function logError(error) {
    const log = `[${new Date().toISOString()}] ERROR: ${error}\n`;
    fs.appendFileSync(logFile, log);
}

module.exports = { logMessage, logError };
