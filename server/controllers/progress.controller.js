const Progress = require("../models/progress");

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne();
    res.json({massage:"get Progress Data", data: progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createProgress = async (req, res) => {
  const {internationalBrands,highQualityProducts,happyCustomers} =req.body

  try {
    const progress = await Progress.create({
      internationalBrands,
      highQualityProducts,
      happyCustomers,
    });

    res.json({ message: "Progress document created ", data: progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateProgress = async (req, res) => {
  try {
    const { internationalBrands, highQualityProducts, happyCustomers } = req.body;
    // remove undefined fields only
    const updateData = {};

    if (internationalBrands !== undefined) {
      updateData.internationalBrands = internationalBrands;
    }

    if (highQualityProducts !== undefined) {
      updateData.highQualityProducts = highQualityProducts;
    }

    if (happyCustomers !== undefined) {
      updateData.happyCustomers = happyCustomers;
    }

    // if nothing to update
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({
        message: "No changes detected",
      });
    }

    // update the ONLY document
    const updated = await Progress.findOneAndUpdate(
      {}, // 👈 no filter = single document
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
        upsert: true, // 👈 create if not exists
      }
    );

    res.json({
      message: "Progress updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};
