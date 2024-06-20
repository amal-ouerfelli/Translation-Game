import axios from "axios";

export const getWord = (difficulty: string) => {
  return axios
    .post("http://localhost:7000/api/words", { difficulty: difficulty })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const setDifficulty = (id:number, difficulty: string) => {
  return axios
    .post("http://localhost:7000/api/words/setDifficulty", {id:id, difficulty: difficulty })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
