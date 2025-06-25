const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
