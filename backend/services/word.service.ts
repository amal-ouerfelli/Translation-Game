import { Translate } from "../utils/translate";
import { Word } from "../models/word";

export class wordService {
  async getWord(difficulty: string) {
    try {
      const words = await Word.find({ difficulty: difficulty });
      if (words.length > 0) {
        // Select a random word
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        // translate the random word
        const res = await Translate(word.word);
        return { word, res };
      } else {
        return null; // No words found
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setDifficulty(id: number, newDifficulty: string) {
    try {
      var word = await Word.findById(id);
      word.difficulty = newDifficulty;
      //save the word with the new difficulty
      word.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}
export const wordServices = new wordService();
