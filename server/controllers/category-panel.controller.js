const CategoryPanel = require("../models/categories-panel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryPanel.findOne();
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateSingleCategory = async (req, res) => {
  try {
    const { type } = req.params; // women | men | children | teenager

    const update = {
      [type]: req.body
    };

    const categories = await CategoryPanel.findOneAndUpdate(
      {},
      { $set: update },
      { returnDocument: "after", upsert: true }
    );

    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
