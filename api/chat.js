// Vercel Serverless Function for shared chat
// This allows users to see each other's messages
// Place this file in the /api folder for Vercel to recognize it

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // For now, use a simple in-memory store
    // In production, use a database like MongoDB, Firebase, or Supabase
    if (!global.chatMessages) {
        global.chatMessages = [];
    }

    if (req.method === 'GET') {
        // Return all messages
        return res.status(200).json({
            messages: global.chatMessages.slice(-100), // Last 100 messages
            timestamp: Date.now()
        });
    }

    if (req.method === 'POST') {
        // Add new message
        const { userName, text } = req.body;

        if (!userName || !text) {
            return res.status(400).json({ error: 'Missing userName or text' });
        }

        const message = {
            id: Date.now() + Math.random(),
            userName: userName,
            text: text,
            timestamp: Date.now()
        };

        global.chatMessages.push(message);

        // Keep only last 500 messages
        if (global.chatMessages.length > 500) {
            global.chatMessages = global.chatMessages.slice(-500);
        }

        return res.status(200).json({ success: true, message: message });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

