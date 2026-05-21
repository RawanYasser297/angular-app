const Hero = require("../models/hero-section");

// GET
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json({ data: hero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.createHero = async (req, res) => {
//   try {
//     const { title, subtitle } = req.body;

//     // 1. Extract file path (assuming you're using Multer)
//     let backgroundImage = "";

//     if (req.file) {
//       backgroundImage = req.file.filename;
//     }

//     // 2. Create the record
//     const data = await Hero.create({
//       title,
//       subtitle,
//       backgroundImage,
//     });

//     console.log(data);
//     // 3. Return 201 for a successful creation
//     res.status(201).json({
//       message: "Hero created successfully",
//       data: data,
//     });
//   } catch (err) {
//     // 4. Proper error handling
//     res.status(500).json({
//       message: "Error creating hero",
//       error: err.message,
//     });
//   }
// };

exports.updateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    let backgroundImage = "";

    if (req.file) {
      backgroundImage = req.file.filename;
    }

    const hero = await Hero.findOneAndUpdate(
      {},
      { title, subtitle, backgroundImage },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      },
    );

    res.json({
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating hero",
      error: err.message,
    });
  }
};
