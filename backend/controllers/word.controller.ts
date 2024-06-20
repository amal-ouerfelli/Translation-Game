import { wordServices } from "../Services/word.service";
import { Request, Response } from "express";

class wordController {
  //get one random word with specific difficulty
  getWord = async (req: Request, res: Response) => {
    const word = await wordServices.getWord(req.body.difficulty);
    res.send(word);
  };

  //set difficulty
  setDifficulty = async (req: Request, res: Response) => {
    const word = await wordServices.setDifficulty(
      req.body.id,
      req.body.newDifficulty
    );
    res.send(word);
  };
}
//export class
export const WordController = new wordController();
