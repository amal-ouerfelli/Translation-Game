const http = require("https");

const options = {
  method: "POST",
  hostname: "google-translator9.p.rapidapi.com",
  port: null,
  path: "/v2",
  headers: {
    "x-rapidapi-key": "84482d3d3emsh0843f9b0d89a3b8p13b189jsnafdee2a21f4d",
    "x-rapidapi-host": "google-translator9.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const Translate = (word: string) => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    const request = http.request(options, (response) => {
      response.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });
      response.on("end", async () => {
        const body = Buffer.concat(chunks);
        const translation = body.toString().split('"')[7];
        resolve(translation);
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.write(
      JSON.stringify({
        q: word,
        source: "fr",
        target: "en",
        format: "text",
      })
    );

    request.end();
  });
};
