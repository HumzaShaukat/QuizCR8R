const router = require("express").Router();
const withAuth = require('../../utils/auth')
const { Score } = require('../../models/');

router.post('/', withAuth, async (req, res) => {
  try {
    const scoreData = await Score.create( {...req.body, user_id: req.session.user_id});
    console.log(scoreData)
       if (!scoreData) {
      res.status(400).json({ message: "Score not saved" });
      return;
    }
    res.status(200).json({ scoreData });
  } catch (err) {
    res.status(500).json(err);
  }
  return;
});

module.exports = router;