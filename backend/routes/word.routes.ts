import express from "express";
import { WordController } from "../controllers/word.controller";

//initiating the router
export const router = express.Router();

//get one random word
router.post("/", WordController.getWord);
// set the difficulty of one word
router.post("/setDifficulty", WordController.setDifficulty);
