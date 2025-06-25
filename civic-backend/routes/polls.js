// Add to polls route
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const polls = await Poll.find({ "votes.email": email }); // Adjust schema as per vote structure
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user poll activity" });
  }
});
