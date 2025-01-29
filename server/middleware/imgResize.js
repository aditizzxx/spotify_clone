import sharp from 'sharp';

export const resizeSongImg = async (req, res, next) => {
  let file;

  if (req.file) {
    // Handling the case for `upload.single('img')`
    file = req.file;
  } else if (req.files && req.files.img) {
    // Handling the case for `upload.fields([{ name: 'img', ... }])`
    file = req.files.img[0];
  }

  if (!file) return next();  
  
  // Generate a unique filename for the resized image
  file.filename = `img-${req.id}-${Date.now()}.jpeg`;

  // Resize the image using sharp
  file.buffer = await sharp(file.buffer)
    .resize(512, 512, {
      fit: sharp.fit.cover, // This focuses on the most "interesting" part of the image when cropping
    })
    .toFormat("jpeg")
    .toBuffer();

  next();
};
