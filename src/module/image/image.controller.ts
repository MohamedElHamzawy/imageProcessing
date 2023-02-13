import sharp from 'sharp';
import { Request, Response } from 'express';
import path from 'path';

const resizeImage = async (req: Request, res: Response) => {
  try {
    const name: string = req.query.name as string;
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);
    await sharp(path.resolve(`./original/${name}.jpg`))
      .resize(width, height)
      .png()
      .toFile(path.resolve(`./resized/${name}-${width}-${height}.png`));
    res
      .status(200)
      .sendFile(path.resolve(`./resized/${name}-${width}-${height}.png`));
  } catch (error) {
    res.status(500).json({ ServerError: error });
  }
};

export default resizeImage;
