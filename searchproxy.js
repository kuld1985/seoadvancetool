const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

// 🔑 अपनी Keys यहां डालें
const GOOGLE_API_KEY = 'AIzaSyBFq4XE_CkSVhITtV7qnZIqtzBU24Mc0TA';
const CSE_ID = '20f8f170dcfbd4e79';

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Missing query param q' });

    try {
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Search API error', details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
