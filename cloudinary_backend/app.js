const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const { response } = require("express");

cloudinary.config({
  cloud_name: "jpex",
  api_key: "578624898929557",
  api_secret: "dls_YiA0yQ_9sLkrc83IgPNtOTA",
});

const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

//Subindo as imagens para o Cloudinary
app.post("/upload", async (req, res, next) => {
  try {
    const { imagens } = req.body;
    let promises = [];

    imagens.forEach(async (imagem) => {
      promises.push(cloudinary.uploader.upload(imagem, { folder: "teste" }));
    });

    const response = await Promise.all(promises);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

//Excluindo imagemdo Cloudnary
app.post("/delete", async (req, res, next) => {
  try {
    const { public_id } = req.body;
    let promises = [];
    
    promises.push(cloudinary.uploader.destroy(public_id));
  
    const response = await Promise.all(promises);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
