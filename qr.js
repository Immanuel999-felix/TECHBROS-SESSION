const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { makeid } = require('./gen-id');
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { rimraf } = require('rimraf');
const pino = require('pino');

router.get('/', async (req, res) => {
    const id = makeid();
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
    try {
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: ["TechBros", "Chrome", "1.0.0"],
        });

        sock.ev.on('creds.update', saveCreds);
        sock.ev.on('connection.update', async (update) => {
            const { connection, qr } = update;
            if (qr) {
                // Return QR as a data URL so the frontend can display it instantly
                const url = await QRCode.toDataURL(qr);
                res.write(`<img src="${url}" />`); 
            }
            if (connection === 'open') {
                res.write("<h3>Connected! Check your WhatsApp.</h3>");
                res.end();
                sock.end();
                rimraf.sync(`./temp/${id}`);
            }
        });
    } catch (e) { res.end(); }
});
module.exports = router;
