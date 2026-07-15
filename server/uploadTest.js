require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async () => {
  try {
    console.log("Config:", cloudinary.config());

    const result = await cloudinary.uploader.upload("./uploads/avatar.png");

    console.log(result);
  } catch (err) {
    console.error("Upload failed:");
    console.error(err);
  }
})();