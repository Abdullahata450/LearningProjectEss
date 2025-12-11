const bcrypt = require('bcryptjs');

// 1. The plain text password you want to hash
const password = "Password1"; 

// 2. The number of salt rounds (same as used in your Mongoose pre-save hook)
const saltRounds = 10; 

async function hashAdminPassword() {
    try {
        console.log(`Hashing password: "${password}"...`);
        
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        
        console.log("---");
        console.log("✅ HASH GENERATED SUCCESSFULLY ✅");
        console.log("---");
        console.log(`Plain Text: ${password}`);
        console.log(`Bcrypt Hash (Copy this):`);
        console.log(hash);
        console.log("---");

    } catch (error) {
        console.error("Error generating hash:", error);
    }
}

// Execute the async function
hashAdminPassword();