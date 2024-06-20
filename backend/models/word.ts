import { Schema, model } from "mongoose";

//creating an interface
interface IWords {
  word: string;
  difficulty: string;
}

//Wordschema
const wordSchema = new Schema<IWords>({
  word: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

//creating a model
export const Word = model<IWords>("Word", wordSchema);
