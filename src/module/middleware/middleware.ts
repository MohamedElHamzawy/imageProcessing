import { NextFunction, Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const queryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name: string = req.query.name as string;
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);
    if (
      name === '' ||
      name == undefined ||
      Number.isNaN(height) ||
      height <= 0 ||
      Number.isNaN(width) ||
      width <= 0
    ) {
      res.status(400).json({
        Error: `Sorry it seems you forgot to declare query strings correcctly, 
        make sure that you added name,height and width in the url with same spelling as mentioned. 
        Make sure that width and height are positive integers.`,
      });
    } else {
      fs.open(path.resolve(`./original/${name}.jpg`))
        .then(() => {
          next();
        })
        .catch(() => {
          res.status(400).json({
            Error: `Image ${name} not found. Make sure you wrote image name correctly and notice that only .jpg images are allowed`,
          });
        });
    }
  } catch (error) {
    res.status(500).json({ ServerError: error });
  }
};
const existValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name: string = req.query.name as string;
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);
    fs.open(path.resolve(`./resized/${name}-${width}-${height}.png`))
      .then(() => {
        res
          .status(200)
          .sendFile(path.resolve(`./resized/${name}-${width}-${height}.png`));
      })
      .catch(() => {
        next();
      });
  } catch (error) {
    res.status(500).json({ ServerError: error });
  }
};

export default { queryValidation, existValidation };
