const SiteSettings = require("../models/site-settings");

exports.getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      req.body,
      { returnDocument: "after", upsert: true }
    );

    res.json({ message: "Settings updated", data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
