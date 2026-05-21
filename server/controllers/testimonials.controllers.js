const Testimonial = require("../models/testimonials");

//get accepted testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "accepted" }).sort({ createdAt: -1 });
    res.json({ data: testimonials });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  
//admin   get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .populate("reviewedBy", "name");
    res.json({ data: testimonials });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// admin update  testimonial
exports.reviewTestimonial = async (req, res) => {
  try {
    const { status } = req.body; // accepted | rejected

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (!req.user?._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewedBy: req.user._id,
        reviewedAt: new Date()
      },
      { returnDocument: "after" }
    );

    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.json({ data: testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//user create testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      ...req.body,
      status: "pending"
    });

    res.status(201).json({ data: testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
