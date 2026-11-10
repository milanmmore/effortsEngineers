import multer from "multer";

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },
  fileFilter: (_req, _file, callback) => callback(null, true),
});

export default imageUpload;
