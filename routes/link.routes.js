const { Router } = require('express');
const config = require('config');
const shortId = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;

    const code = shortId.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
     return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code, from, to, owner: req.user.userId
    });

    await link.save();

    res.json(201).json({ link });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    return res.json(links);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    return res.json(links);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
