const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/surveys", async (req, res) => {
  try {
    const response = await fetch("https://api.publicinput.com/v1/surveys", {
      headers: {
        Authorization: `Bearer ${process.env.PUBLICINPUT_API_KEY}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
});

module.exports = router;
