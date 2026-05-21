const Banner = require("../models/footer-black-banner");

exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true });
    res.json({ data: banner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  
  try {
    const banner = await Banner.findOneAndUpdate(
      {},
      req.body,
      { returnDocument: "after", upsert: true }
    );

    res.json({ message: "Banner updated", data: banner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
