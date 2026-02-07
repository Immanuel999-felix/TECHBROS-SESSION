const { Storage } = require('megajs');

const storage = new Storage({
    email: process.env.MEGA_EMAIL,
    password: process.env.MEGA_PASSWORD,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
});

async function upload(stream, name) {
    await storage.ready;
    const result = await storage.upload({ name }, stream).complete;
    return await result.link();
}

module.exports = { upload };
