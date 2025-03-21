const fs = require("fs");
const dbFile = "./database.json";

// Load database
function loadDatabase() {
    if (!fs.existsSync(dbFile)) return {};
    return JSON.parse(fs.readFileSync(dbFile));
}

// Save database
function saveDatabase(db) {
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

// Get user data
function getUserData(userId) {
    const db = loadDatabase();
    return db[userId] || { messages: 0 };
}

// Update user messages count
function updateUserMessages(userId) {
    const db = loadDatabase();
    if (!db[userId]) db[userId] = { messages: 0 };
    db[userId].messages += 1;
    saveDatabase(db);
}

module.exports = { getUserData, updateUserMessages };
