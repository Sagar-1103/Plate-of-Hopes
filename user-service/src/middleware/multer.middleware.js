import multer from "multer";
import os from 'os';
import path from 'path';

const uploadsDir = path.join(os.tmpdir(), 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({storage});