require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const corsMiddleware = require('./middlewares/cors');
const { upload } = require('./middlewares/upload.middleware');
const routes = require('./routes');

const app = express();

/* =========================
   Middleware
========================= */
app.use(corsMiddleware);
app.use(express.json());

/* =========================
   Routes
========================= */
app.use('/api/files', express.static(path.join(__dirname, './uploads')));
app.use('/api/v1', routes);

app.post('/test', upload.array('files', 5), (req, res) => {
  console.log(req.files);
  res.json({ files: req.files });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed', error.message);
    process.exit(1);
  }
};

/* =========================
   Start Server
========================= */
const PORT = 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
