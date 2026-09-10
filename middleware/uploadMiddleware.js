const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cd) => {
  
      console.log("File:", file);
    console.log("Mimetype:", file.mimetype);
   
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];
    const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;

  if (
      allowedMimeTypes.includes(file.mimetype) || 
      (
      file.mimetype === "application/octet-stream" && allowedExtensions.test(file.originalname)
      ) 
    ) {
    cd(null, true);
  } else {
    cd(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage, fileFilter, limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;