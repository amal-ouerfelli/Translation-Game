export enum difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export interface Iword {
  word: string;
  translation: string;
  difficulty: difficulty;
}
export interface IWrongAnswers {
  word: string;
  difficulty: difficulty;
}
