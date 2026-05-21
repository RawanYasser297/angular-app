const Brand = require("../models/brands.model");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.findOne();

    res.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//available in the site
exports.showBrands = async (req, res) => {
  try {
    const brands = await Brand.findOne({ show: true });

    res.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//add new brands or create brands doc
exports.updateBrands = async (req, res) => {
  try {
    // 1. check files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload logos",
      });
    }

    let brand = await Brand.findOne();

    if (!brand) {
      const logos = req.files.map((file) => ({
        image: file.filename
      }));

      if (logos.length > 5) {
        return res.status(400).json({
          message: "Maximum 5 logos allowed",
        });
      }

      console.log(logos);

      brand = await Brand.create({ logos });

      return res.json({
        message: "Brands created",
        data: brand,
      });
    }

    // 4. append new logos
    const uploaded = req.files.map((file) => ({
      image: file.filename,
    }));

    //5. enforce max 5
    if (uploaded.length > 5) {
      return res.status(400).json({
        message: "Maximum 5 logos allowed",
      });
    }

    const newLogos = [...brand.logos, ...uploaded];

    // 6. save
    brand.logos = newLogos;
    await brand.save();

    res.json({
      message: "Brands updated",
      data: brand,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update available brands show status
exports.toggleLogoStatus = async (req, res) => {
  try {
    const { logoId } = req.params;
 
    console.log(logoId)
    const brand = await Brand.findOne();

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // 🔥 نجيب اللوجو بالـ _id
    const logo = brand.logos.id(logoId);

    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }

    // 🔥 toggle
    logo.show = !logo.show;

    await brand.save();

    res.json({
      message: "Logo status updated",
      data: brand,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
